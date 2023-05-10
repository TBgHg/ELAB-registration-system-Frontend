import type { ContentType } from "./common";

interface Space {
  /**
   * 空间的UUID。
   */
  space_id: string;
  /**
   * 空间的名称。
   */
  name: string;
  /**
   * 空间的描述。
   */
  description: string;
  /**
   * 空间是否为私密空间
   */
  private: boolean;
}

type SpacePatchType = "add" | "edit";

interface SpacePatchParam {
  id?: string;
  type: SpacePatchType;
}

interface MemberOperation {
  /**
   * 创建时间
   */
  created_at: Date;
  /**
   * 空间ID
   */
  space_id: string;
  /**
   * 申请人的OpenID
   */
  openid: string;
  /**
   * 申请状态
   */
  status: "pending" | "accepted" | "rejected";
  /**
   * 操作类型
   */
  type: "apply" | "invitation";
}

function createEmptySpace() {
  return {
    space_id: "",
    name: "",
    description: "",
    private: false,
  };
}

type OperationType = "invitation" | "apply";

interface MemberOperationPageParam {
  type: OperationType;
  space: boolean;
}

interface SpaceContentPageParam {
  id: string;
  type: ContentType;
}

interface ContentListPageParam {
  type: ContentType;
}

type SpacePosition = "owner" | "moderator" | "none";

interface SpaceMember {
  openid: string;
  avatar: string;
  name: string;
  position: SpacePosition;
}

export type {
  Space,
  SpacePatchType,
  SpacePatchParam,
  MemberOperation,
  OperationType,
  SpaceMember,
  SpacePosition,
  SpaceContentPageParam,
  ContentListPageParam,
  MemberOperationPageParam,
};
export { createEmptySpace };
