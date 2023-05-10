import type { SpacePosition } from "./space";

interface MemberResponse {
  openid: string;
  name: string;
  avatar: string;
  position: SpacePosition;
}

type InvitationOperation =
  | "send_invitation"
  | "accept_invitation"
  | "reject_invitation"
  | "revoke_invitation";

type ApplyOperation =
  | "accept_apply"
  | "reject_apply"
  | "revoke_apply"
  | "send_apply";

type Operation = InvitationOperation | ApplyOperation;

interface MemberOperationRequest {
  openid: string;
  operation: string;
}

type ExistingMemberOperation = "set_moderator" | "remove_moderator";

export type {
  MemberResponse,
  InvitationOperation,
  ApplyOperation,
  Operation,
  MemberOperationRequest,
  ExistingMemberOperation,
};
