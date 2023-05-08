import { Buffer } from "buffer";
import * as AuthSession from "expo-auth-session";
import { makeAutoObservable } from "mobx";

import { oidcClientId, oidcDiscovery } from "@/constants/index";
import { createEmptyLongTextForm } from "@/types/application";
import {
  createEmptyCredential,
  createEmptyJwt,
  createEmptyUser,
  createEmptyUserInfo,
} from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { LongTextForm, InterviewRoom } from "@/types/application";
import type { User, Credential, JWT, UserInfo } from "@/types/user";
import type { RootStore } from ".";
import axios from "axios";
import UserClient from "../client/v1/user";
import ApplicationClient from "../client/v1/application";

interface SetValueOptions {
  /**
   * 是否将获取到的信息存储到本地。
   */
  withStorage?: boolean;
}

const storageKeys = {
  USER: "elab://user-store/user",
  CREDENTIAL: "elab://user-store/credential",
  USERINFO: "elab://user-store/userInfo",
  JWT: "elab://user-store/jwt",
};

/**
 * 存储用户信息的数据仓库。
 * 里面包含了用户信息、登陆凭据信息以及加载状态。
 */
class UserStore {
  /**
   * 后端服务器存储的用户信息。
   */
  user = createEmptyUser();

  rootStore: RootStore;

  get userStatus() {
    if (this.loading) {
      return "loading";
    } else if (this.credential.accessToken === "") {
      return "unauthorized";
    } else if (!this.user.is_elab_member) {
      return "not_elab_member";
    } else {
      return "authorized";
    }
  }

  state: string = "";

  setState(state) {
    this.state = state;
  }

  /**
   * 设置用户信息。
   * @param user 用户信息，可以只填写部分信息，会自动合并。
   * @param withStorage 是否将用户信息存储到本地。
   */
  setUser(user: Partial<User>, options?: SetValueOptions) {
    const { withStorage = true } = options ?? {};
    this.user = Object.assign(this.user, user);
    if (!withStorage) return;
    AsyncStorage.setItem(storageKeys.USER, JSON.stringify(user)).catch(
      (err) => {
        // 项目规范：遇见需要抛出的错误，需要使用Error类进行包装，在Error类的构造函数中传入错误信息和错误原因。
        // new Error("message", { cause: err })
        throw new Error("本地存储功能失效。", { cause: err });
      }
    );
  }

  /**
   * 从本地存储中获取用户信息等缓存内容。
   * 缓存的信息有：用户信息、用户凭据、JWT信息以及认证服务器上的用户信息。
   */
  async fetchDataFromCache() {
    let [userJson, credentialJson, userInfoJson, jwtJson]: Array<
      string | null
    > = ["", "", "", ""];
    try {
      [userJson, credentialJson, userInfoJson, jwtJson] = await Promise.all([
        AsyncStorage.getItem(storageKeys.USER),
        AsyncStorage.getItem(storageKeys.CREDENTIAL),
        AsyncStorage.getItem(storageKeys.USERINFO),
        AsyncStorage.getItem(storageKeys.JWT),
      ]);
    } catch (err) {
      throw new Error("读取用户缓存过程中，本地存储功能失效。", { cause: err });
    }
    this.setUser(userJson != null ? JSON.parse(userJson) : createEmptyUser(), {
      withStorage: false,
    });
    this.setCredential(
      credentialJson != null
        ? JSON.parse(credentialJson)
        : createEmptyCredential(),
      { withStorage: false, parseJwt: false }
    );
    this.setUserInfo(
      userInfoJson != null ? JSON.parse(userInfoJson) : createEmptyUserInfo(),
      { withStorage: false }
    );
    this.setJwt(jwtJson != null ? JSON.parse(jwtJson) : createEmptyJwt(), {
      withStorage: false,
    });
  }

  /**
   * 对用户凭据进行刷新。
   * 刷新Token不需要Client Secret。
   */
  async refreshCredential() {
    let discovery: AuthSession.DiscoveryDocument | null = null;
    try {
      discovery = await AuthSession.fetchDiscoveryAsync(oidcDiscovery);
    } catch (err) {
      throw new Error(`无法获取OIDC Discovery: ${oidcDiscovery}`, {
        cause: err,
      });
    }
    if (discovery == null) {
      throw new Error(`OIDC Discovery获取结果为null: ${oidcDiscovery}`);
    }
    try {
      const response = await AuthSession.refreshAsync(
        {
          refreshToken: this.credential.refreshToken,
          clientId: oidcClientId,
          // 一定注意！刷新凭据必须填scopes，否则无法获取UserInfo
          scopes: ["openid", "profile", "email"],
        },
        discovery
      );
      this.setCredential({
        accessToken: response.accessToken,
        refreshToken: response.accessToken,
      });
    } catch (err) {
      throw new Error("刷新凭据出现错误。", { cause: err });
    }
  }

  /**
   * 获取额外的用户信息，这部分来自后端服务器。
   * 若没有accessToken的情况下调用本函数将出现错误。
   */
  async fetchExtraInfo() {
    const userClient = new UserClient(this.credential.accessToken);
    const userInfoPromise = userClient
      .fetchUser(this.jwt.sub)
      .then((userInfo) => {
        this.setUser(userInfo);
      })
      .catch((err) => {
        // userInfo获取失败，因此属于后端出现了问题，直接panic
        throw new Error("获取后端用户信息出现错误。", { cause: err });
      });

    const applicationClient = new ApplicationClient(
      this.credential.accessToken
    );
    const longTextFormPromise = applicationClient
      .fetchLongTextForm()
      .then((longTextForm) => {
        this.setLongTextForm(longTextForm);
      })
      .catch(async (err) => {
        if (
          axios.isAxiosError(err) &&
          err.response?.data.error === "long_text_form_not_found"
        ) {
          this.setLongTextForm(createEmptyLongTextForm());
          return;
        }
        // longTextForm获取失败，因此属于后端出现了问题，直接panic
        throw new Error("获取后端长文本表单出现错误。", { cause: err });
      });
    await Promise.all([userInfoPromise, longTextFormPromise]);
  }

  /**
   * 获取用户在认证服务器的信息。
   */
  async fetchUserInfo() {
    let discovery: AuthSession.DiscoveryDocument | null = null;
    try {
      discovery = await AuthSession.fetchDiscoveryAsync(oidcDiscovery);
    } catch (err) {
      throw new Error(`无法获取OIDC Discovery: ${oidcDiscovery}`, {
        cause: err,
      });
    }
    if (discovery == null) {
      throw new Error(`OIDC Discovery获取结果为null: ${oidcDiscovery}`);
    }
    try {
      if (this.credential.accessToken === "") {
        this.setUserInfo(createEmptyUserInfo());
      }
      const response = await AuthSession.fetchUserInfoAsync(
        {
          accessToken: this.credential.accessToken,
        },
        discovery
      );
      this.setUserInfo(response as UserInfo);
    } catch (err) {
      throw new Error("获取OIDC用户信息出现错误。", { cause: err });
    }
  }

  /**
   * 长文本表单内容。
   * 长文本表单并不属于缓存的范畴，应该在每次进入应用时都重新获取。
   */
  longTextForm = createEmptyLongTextForm();

  /**
   * 设置长文本表单。
   * @param longTextForm 长文本表单，不同于User，这里不会自动合并，而是直接覆盖。
   */
  setLongTextForm(longTextForm: LongTextForm) {
    this.longTextForm = longTextForm;
  }

  // 用户凭据、JWT信息以及认证服务器上的用户信息，属于缓存的范畴，应该在每次进入应用时都重新获取存储。
  /**
   * 用户凭据信息。
   */
  credential = createEmptyCredential();

  /**
   * 设置用户凭据
   * @param credential 要设置的用户凭据
   * @param options 设置的一些选项
   */
  setCredential(
    credential: Credential,
    options?: SetValueOptions & {
      /**
       * 是否将获得的accessToken解析为JWT。
       */
      parseJwt?: boolean;
    }
  ) {
    const { withStorage = true, parseJwt = true } = options ?? {};
    if (parseJwt) {
      this.toggleLoading(true);
    }
    this.credential = credential;
    if (withStorage) {
      AsyncStorage.setItem(
        storageKeys.CREDENTIAL,
        JSON.stringify(credential)
      ).catch((err) => {
        throw new Error("将credential存储过程中，本地存储功能失效。", {
          cause: err,
        });
      });
    }
    if (parseJwt) {
      // atob和btoa是Base64编码的两个方法，但已被deprecated，因此使用Buffer进行编码。
      const rawJwt = Buffer.from(
        credential.accessToken.split(".")[1],
        "base64"
      ).toString("utf-8");
      const jwt = JSON.parse(rawJwt);
      this.setJwt(jwt, { withStorage });
      Promise.allSettled([this.fetchExtraInfo(), this.fetchUserInfo()])
        .then(() => {
          this.toggleLoading(false);
        })
        .catch((err) => {
          throw new Error(
            "在设置Credential过程中，获取额外用户信息过程中出现错误。",
            { cause: err }
          );
        });
    }
  }

  /**
   * 用户的JWT信息。
   */
  jwt = createEmptyJwt();

  /**
   * 设置用户JWT，一般情况下会随着用户凭据的设置而自动设置。本API使用的情况很少。
   * @param jwt 要设置的JWT
   * @param options 要设置的一些选项
   */
  setJwt(jwt: JWT, options?: SetValueOptions) {
    const { withStorage = true } = options ?? {};
    this.jwt = jwt;
    if (!withStorage) return;
    AsyncStorage.setItem(storageKeys.JWT, JSON.stringify(jwt)).catch((err) => {
      throw new Error("在将jwt存储过程中，本地存储功能失效。", { cause: err });
    });
  }

  /**
   * 用户在认证服务器的用户信息。
   */
  userInfo = createEmptyUserInfo();

  /**
   * 设置来自认证服务器的用户信息。
   *
   * **如果您在除`UserStore.fetchUserInfo()`以外调用本函数，极有可能会出现异常。**
   * @param userInfo 要设置的用户信息
   * @param options 要设置的一些选项
   */
  setUserInfo(userInfo: UserInfo, options?: SetValueOptions) {
    const { withStorage = true } = options ?? {};
    this.userInfo = userInfo;
    if (!withStorage) return;
    AsyncStorage.setItem(storageKeys.USERINFO, JSON.stringify(userInfo)).catch(
      (err) => {
        throw new Error("在将userInfo存储过程中，本地存储功能失效。", {
          cause: err,
        });
      }
    );
  }

  /**
   * 用户所选定的面试室。
   */
  selectedInterviewRoom?: InterviewRoom;

  /**
   * 是否正在加载用户信息。
   */
  loading: boolean = true;

  /**
   * 清空所有用户数据。
   */
  clearUserData() {
    this.setUser(createEmptyUser(), { withStorage: true });
    this.setCredential(createEmptyCredential(), {
      withStorage: true,
      parseJwt: false,
    });
    this.setUserInfo(createEmptyUserInfo(), { withStorage: true });
    this.setJwt(createEmptyJwt(), { withStorage: true });
    this.setLongTextForm(createEmptyLongTextForm());
  }

  /**
   * UserStore的构造函数。
   *
   * 本构造函数主要做了下面几件事情：
   * 1. 调用makeAutoObservable，使得本类的所有属性都可以被MobX追踪。
   * 2. 从缓存中读取用户信息等内容。
   * 3. 如果用户已经登录，那么刷新，从认证服务器获取用户信息，若刷新失败则代表用户凭据已经失效，清空用户数据。
   * 4. 如果用户已经登陆，则从后端服务器获取其他用户信息。
   */
  constructor(rootStore: RootStore) {
    makeAutoObservable(this); // MobX官网文档明确了所有的初始化操作都需要在makeAutoObservable之后进行。
    this.rootStore = rootStore;
    this.toggleLoading(true);
    // 首先从缓存读取用户信息等内容。
    this.fetchDataFromCache()
      .then(async () => {
        if (this.credential.accessToken !== "") {
          await Promise.all([this.fetchUserInfo(), this.fetchExtraInfo()]);
          return true;
        }
        return false;
      })
      .catch((err) => {
        this.clearUserData();
        console.warn("获取用户信息时出现错误，已将用户数据清空。");
        console.warn(err);
      })
      .finally(() => {
        this.toggleLoading(false);
      });
  }

  /**
   * 切换用户信息加载状态。
   * @param loading 是否正在加载用户信息，可以留空。
   */
  toggleLoading(loading?: boolean) {
    if (loading === undefined) {
      this.loading = !this.loading;
    } else {
      this.loading = loading;
    }
  }
}

export default UserStore;
