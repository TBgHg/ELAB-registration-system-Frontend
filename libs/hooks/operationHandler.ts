import { Alert } from "react-native";
import MemberClient from "../client/v1/space/member";
import { store } from "../store";

const acceptInvitation = async (spaceId: string) => {
  Alert.alert("接受邀请？", "接受邀请后，您将成为该空间的成员。", [
    {
      text: "取消",
      style: "cancel",
    },
    {
      text: "接受",
      onPress: () => {
        const accessToken = store.user.credential.accessToken;
        const client = new MemberClient(accessToken, spaceId);
        client
          .operateMember({
            openid: store.user.user.openid,
            operation: "accept_invitation",
          })
          .catch((err) => {
            console.error(err);
            Alert.alert("接受邀请失败", "请稍后再试。");
          });
      },
    },
  ]);
};

const rejectInvitation = async (spaceId: string) => {
  Alert.alert("拒绝邀请？", "拒绝邀请后，您将不会成为该空间的成员。", [
    {
      text: "取消",
      style: "cancel",
    },
    {
      text: "拒绝",
      onPress: () => {
        const accessToken = store.user.credential.accessToken;
        const client = new MemberClient(accessToken, spaceId);
        client
          .operateMember({
            openid: store.user.user.openid,
            operation: "reject_invitation",
          })
          .catch((err) => {
            console.error(err);
            Alert.alert("拒绝邀请失败", "请稍后再试。");
          });
      },
    },
  ]);
};

const acceptApply = async (spaceId: string, openid: string) => {
  Alert.alert("接受申请？", "接受申请后，该用户将成为该空间的成员。", [
    {
      text: "取消",
      style: "cancel",
    },
    {
      text: "接受",
      onPress: () => {
        const accessToken = store.user.credential.accessToken;
        const client = new MemberClient(accessToken, spaceId);
        client
          .operateMember({
            openid,
            operation: "accept_apply",
          })
          .catch((err) => {
            console.error(err);
            Alert.alert("接受申请失败", "请稍后再试。");
          });
      },
    },
  ]);
};

const rejectApply = async (spaceId: string, openid: string) => {
  Alert.alert("拒绝申请？", "拒绝申请后，该用户将不会成为该空间的成员。", [
    {
      text: "取消",
      style: "cancel",
    },
    {
      text: "拒绝",
      onPress: () => {
        const accessToken = store.user.credential.accessToken;
        const client = new MemberClient(accessToken, spaceId);
        client
          .operateMember({
            openid,
            operation: "reject_apply",
          })
          .catch((err) => {
            console.error(err);
            Alert.alert("拒绝申请失败", "请稍后再试。");
          });
      },
    },
  ]);
};

const revokeInvitation = async (spaceId: string, openid: string) => {
  Alert.alert("撤销邀请？", "撤销邀请后，该用户将不会接收邀请。", [
    {
      text: "取消",
      style: "cancel",
    },
    {
      text: "撤销",
      onPress: () => {
        const accessToken = store.user.credential.accessToken;
        const client = new MemberClient(accessToken, spaceId);
        client
          .operateMember({
            openid,
            operation: "revoke_invitation",
          })
          .catch((err) => {
            console.error(err);
            Alert.alert("撤销邀请失败", "请稍后再试。");
          });
      },
    },
  ]);
};

const revokeApply = async (spaceId: string) => {
  Alert.alert("撤销申请？", "撤销申请后，您将不会成为该空间的成员。", [
    {
      text: "取消",
      style: "cancel",
    },
    {
      text: "撤销",
      onPress: () => {
        const accessToken = store.user.credential.accessToken;
        const client = new MemberClient(accessToken, spaceId);
        client
          .operateMember({
            openid: store.user.user.openid,
            operation: "revoke_apply",
          })
          .catch((err) => {
            console.error(err);
            Alert.alert("撤销申请失败", "请稍后再试。");
          });
      },
    },
  ]);
};

export {
  acceptInvitation,
  rejectInvitation,
  acceptApply,
  rejectApply,
  revokeInvitation,
  revokeApply,
};
