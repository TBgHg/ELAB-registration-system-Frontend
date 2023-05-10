import type { MemberOperation, Space } from "@/types/space";
import type { AxiosInstance } from "axios";
import Client from "..";
class SpaceClient extends Client {
  getClient(): AxiosInstance {
    const client = super.getClient();
    client.defaults.baseURL = (client.defaults.baseURL as string) + "/space";
    return client;
  }

  async create(name: string, description?: string) {
    const client = this.getClient();
    const { data } = await client.post("", {
      name,
      description,
    });
    return data;
  }

  async search(
    name?: string,
    page?: number,
    pageSize?: number
  ): Promise<Space[]> {
    const client = this.getClient();
    const { data } = await client.get("", {
      params: {
        name,
        page,
        pageSize,
      },
    });
    return data.spaces;
  }

  async delete(id: string) {
    const client = this.getClient();
    const { data } = await client.delete(`/${id}`);
    return data;
  }

  async fetchSpace(id: string): Promise<Space> {
    const client = this.getClient();
    const { data } = await client.get(`/${id}`);
    return data;
  }

  async update(id: string, payload: Partial<Omit<Space, "openid">>) {
    const client = this.getClient();
    const { data } = await client.patch(`/${id}`, payload);
    return data;
  }

  async fetchMeta(id: string) {
    const client = this.getClient();
    const { data } = await client.get(`/${id}/meta`);
    return JSON.parse(data.meta);
  }

  async updateMeta(id: string, meta: any) {
    const client = this.getClient();
    const { data } = await client.patch(`/${id}/meta`, {
      meta: JSON.stringify(meta),
    });
    return data;
  }

  async fetchInvitations(id: string): Promise<MemberOperation[] | null> {
    const client = this.getClient();
    const { data } = await client.get(`/${id}/invitations`);
    let { invitations } = data;
    invitations = invitations.map((invitation: any) => {
      return Object.assign(invitation, {
        created_at: new Date(invitation.created_at),
        type: "invitation",
      });
    });
    return invitations;
  }

  async fetchApplies(id: string): Promise<MemberOperation[] | null> {
    const client = this.getClient();
    const { data } = await client.get(`/${id}/applies`);
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

export default SpaceClient;
