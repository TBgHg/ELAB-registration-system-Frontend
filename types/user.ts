type Group = "电子组" | "软件组";

/**
 * 从后端获取的用户附加信息。
 */
interface UserExtraInfoServerResponse {
  // 暂且先这样写，可能以后会有变动。
  data: User;
}

interface User {
  /**
   * OpenID
   */
  openid: string;
  /**
   * 真实姓名，不同于用户名
   */
  name: string;
  /**
   * 班级
   */
  className: string;
  /**
   * 所属组别
   */
  group: Group;
  /**
   * 是否为成员
   */
  isMember: boolean;
}

interface TokenBase {
  /**
   * OpenID
   */
  sub: string;
  /**
   * 签发者
   */
  iss: string;
  /**
   * 接收者
   */
  aud: string[] | string;
  /**
   * 用户名
   */
  name: string;
}

interface JWT extends TokenBase {
  /**
   * 过期时间
   */
  exp: number;
  /**
   * 签发时间
   */
  iat: number;
  /**
   * 生效时间
   */
  nbf: number;
  /**
   * 作用域
   */
  scope: string;
}

interface UserInfo extends TokenBase {
  /**
   * 昵称
   */
  preferred_username: string;
  /**
   * 邮箱
   */
  email: string;
  /**
   * 头像
   */
  picture: string;
}

interface Credential {
  accessToken: string;
  refreshToken: string;
}

function createEmptyJwt(): JWT {
  return {
    sub: "",
    iss: "",
    aud: "",
    name: "",
    exp: 0,
    iat: 0,
    nbf: 0,
    scope: "",
  };
}

function createEmptyUserInfo(): UserInfo {
  return {
    sub: "",
    iss: "",
    aud: "",
    name: "",
    preferred_username: "",
    email: "",
    picture: "",
  };
}

function createEmptyCredential(): Credential {
  return {
    accessToken: "",
    refreshToken: "",
  };
}

function createEmptyUser(): User {
  return {
    openid: "",
    name: "",
    className: "",
    group: "电子组",
    isMember: false,
  };
}

type UserStatus = "elab_member" | "not_elab_member" | "unauthorized";

export type {
  Group,
  TokenBase,
  User,
  Credential,
  UserInfo,
  JWT,
  UserStatus,
  UserExtraInfoServerResponse,
};

export {
  createEmptyJwt,
  createEmptyUserInfo,
  createEmptyCredential,
  createEmptyUser,
};
