import { makeAutoObservable } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Status = "loading" | "done";

interface JWT {
  name?: string;
  scope?: string;
  exp?: number;
  iat?: number;
  iss?: string;
  aud?: string[];
  sub?: string;
  jti?: string;
  nbf?: number;
}

interface Credential {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

class UserCredentialStore {
  username = "";

  passwordDictionary = {
    zeithrold: "zeithrold",
    not_elab_member: "not_elab_member",
  };

  usernameDictionary = {
    zeithrold: "金一",
    not_elab_member: "测试",
  };

  status: Status = "loading";

  get sessionStatus() {
    if (this.username === "zeithrold") {
      return "authorized";
    } else if (this.username === "not_elab_member") {
      return "not_elab_member";
    }
    return "unauthorized";
  }

  saveCredential() {
    AsyncStorage.setItem("temp_username", this.username).catch((err) => {
      console.error(err);
    });
  }

  clearCredential() {
    this.username = "";
    AsyncStorage.removeItem("temp_username").catch((err) => {
      console.error(err);
    });
  }

  loadCredential() {
    this.setStatus("loading");
    AsyncStorage.getItem("temp_username")
      .then((username) => {
        if (username == null) {
          this.setUserName("");
        } else {
          this.setUserName(username);
        }
        this.setStatus("done");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  setStatus(status: Status) {
    this.status = status;
  }

  setUserName(username: string) {
    this.username = username;
  }

  constructor() {
    makeAutoObservable(this);
    this.loadCredential();
  }
}

export default UserCredentialStore;
export type { JWT, Credential };
