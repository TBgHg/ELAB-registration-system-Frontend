import type { MemberOperation, Space } from "@/types/space";
import type { User } from "@/types/user";
import Client from "@/libs/client/v1";

class UserClient extends Client {
  getClient() {
    const client = super.getClient();
    client.defaults.baseURL = (client.defaults.baseURL as string) + "/user";
    return client;
  }

  async fetchUser(openid: string): Promise<User> {
    const client = this.getClient();
    const { data } = await client.get(`/${openid}`);
    return data;
  }

  async fetchSpaces(openid: string): Promise<Space[] | null> {
    const client = this.getClient();
    const { data } = await client.get(`/${openid}/spaces`);
    return data.spaces;
  }

  async updateUser(
    openid: string,
    user: Partial<Omit<User, "openid" | "is_elab_member">>
  ): Promise<User> {
    const client = this.getClient();
    const { data } = await client.patch(`/${openid}`, user);
    return data;
  }

  async fetchInvitations(openid: string): Promise<Array<
    MemberOperation & {
      type: "invitation";
    }
  > | null> {
    const client = this.getClient();
    const { data } = await client.get(`/${openid}/invitations`);
    return Object.assign(data.invitations, {
      type: "invitation",
      created_at: new Date(data.invitations.created_at),
    });
  }

  async fetchApplies(openid: string): Promise<Array<
    MemberOperation & {
      type: "apply";
    }
  > | null> {
    const client = this.getClient();
    const { data } = await client.get(`/${openid}/applies`);
    return Object.assign(data.applies, {
      type: "apply",
      created_at: new Date(data.applies.created_at),
    });
  }
}

export default UserClient;
