type Group = "电子组" | "软件组";

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
  class_name: string;
  /**
   * 所属组别
   */
  group: Group;
  /**
   * 是否为成员
   */
  is_elab_member: boolean;
  /**
   * 联系方式
   */
  contact: string;
  /**
   * 电子邮箱
   */
  email: string;
  /**
   * 学号
   */
  student_id: string;
  /**
   * 其他元数据
   */
  meta: any;
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
    class_name: "",
    group: "电子组",
    is_elab_member: false,
    contact: "",
    email: "",
    student_id: "",
    meta: {},
  };
}

type UserStatus = "elab_member" | "not_elab_member" | "unauthorized";

export type { Group, TokenBase, User, Credential, UserInfo, JWT, UserStatus };

export {
  createEmptyJwt,
  createEmptyUserInfo,
  createEmptyCredential,
  createEmptyUser,
};
