import type { MemberOperation, Space } from "@/types/space";
import type { User } from "@/types/user";
import Client from "@/libs/client/v1";

class UserClient extends Client {
  getClient() {
    const client = super.getClient();
    client.defaults.baseURL = (client.defaults.baseURL as string) + "/user";
    return client;
  }

  async searchUser(
    name?: string,
    page?: number,
    size?: number
  ): Promise<User[]> {
    const client = this.getClient();
    const { data } = await client.get("", {
      params: {
        name,
        page,
        size,
      },
    });
    return data.users;
  }

  async fetchUser(openid: string, omitempty?: boolean): Promise<User> {
    const client = this.getClient();
    const { data } = await client.get(`/${openid}`);
    // 对data进行补正
    // data当中下列字段属于omitempty，如果为空，则需要补上
    if (omitempty !== undefined && omitempty) {
      // 需要补全的字段为：
      // name, student_id, class_name, group, contact, last_login_at, meta
      [
        "name",
        "student_id",
        "class_name",
        "group",
        "contact",
        "last_login_at",
        "meta",
      ].forEach((key) => {
        if (data[key] === undefined) {
          if (key === "group") {
            data[key] = "电子组";
          } else {
            data[key] = "";
          }
        }
      });
    }
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
    let { invitations } = data;
    invitations = invitations.map((invitation: any) => {
      return Object.assign(invitation, {
        created_at: new Date(invitation.created_at),
        type: "invitation",
      });
    });
    return invitations;
  }

  async fetchApplies(openid: string): Promise<Array<
    MemberOperation & {
      type: "apply";
    }
  > | null> {
    const client = this.getClient();
    const { data } = await client.get(`/${openid}/applies`);
    let { applies } = data;
    applies = applies.map((apply: any) => {
      return Object.assign(apply, {
        created_at: new Date(apply.created_at),
        type: "apply",
      });
    });
    return applies;
  }
}

export default UserClient;
