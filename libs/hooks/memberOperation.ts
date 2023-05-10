import SpaceClient from "../client/v1/space/space";
import UserClient from "../client/v1/user";
import { store } from "@/libs/store";
import type { OperationType } from "@/types/space";

const fetchSpaceInvitations = async (spaceId: string, accessToken: string) => {
  const client = new SpaceClient(accessToken);
  const invitations = await client.fetchInvitations(spaceId);
  if (invitations === null) {
    return undefined;
  }
  const result = await Promise.all(
    invitations.map(async (invitation) => {
      const userClient = new UserClient(accessToken);
      const user = await userClient.fetchUser(invitation.openid);
      return {
        operation: invitation,
        name: user.name,
      };
    })
  );
  return result;
};

const fetchSpaceApplies = async (spaceId: string, accessToken: string) => {
  const client = new SpaceClient(accessToken);
  const applies = await client.fetchApplies(spaceId);
  if (applies === null) {
    return undefined;
  }
  const result = await Promise.all(
    applies.map(async (apply) => {
      const userClient = new UserClient(accessToken);
      const user = await userClient.fetchUser(apply.openid);
      return {
        operation: apply,
        name: user.name,
      };
    })
  );
  return result;
};

const fetchSelfInvitations = async (accessToken: string) => {
  const client = new UserClient(accessToken);
  const invitations = await client.fetchInvitations(store.user.user.openid);
  if (invitations === null) {
    return undefined;
  }
  const result = await Promise.all(
    invitations.map(async (invitation) => {
      const spaceClient = new SpaceClient(accessToken);
      const space = await spaceClient.fetchSpace(invitation.space_id);
      return {
        operation: invitation,
        name: space.name,
      };
    })
  );
  return result;
};

const fetchSelfApplies = async (accessToken: string) => {
  const client = new UserClient(accessToken);
  const applies = await client.fetchApplies(store.user.user.openid);
  if (applies === null) {
    return undefined;
  }
  const result = await Promise.all(
    applies.map(async (apply) => {
      const spaceClient = new SpaceClient(accessToken);
      const space = await spaceClient.fetchSpace(apply.space_id);
      return {
        operation: apply,
        name: space.name,
      };
    })
  );
  return result;
};

const fetchOperations = async (
  accessToken: string,
  space: boolean,
  type: OperationType
) => {
  if (space) {
    if (type === "invitation") {
      return await fetchSpaceInvitations(
        store.space.space.space_id,
        accessToken
      );
    } else {
      return await fetchSpaceApplies(store.space.space.space_id, accessToken);
    }
  } else {
    if (type === "invitation") {
      return await fetchSelfInvitations(accessToken);
    } else {
      return await fetchSelfApplies(accessToken);
    }
  }
};

export {
  fetchSpaceInvitations,
  fetchSpaceApplies,
  fetchSelfInvitations,
  fetchSelfApplies,
  fetchOperations,
};
