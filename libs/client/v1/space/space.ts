import type { MemberOperation, Space } from "@/types/space";
import type { AxiosInstance } from "axios";
import { Client } from "..";

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

  async update(id: string, payload: Partial<Omit<Space, "openid">>) {
    const client = this.getClient();
    const { data } = await client.patch(`/${id}`, payload);
    return data;
  }

  async fetchInvitations(id: string): Promise<MemberOperation[] | null> {
    const client = this.getClient();
    const { data } = await client.get(`/${id}/invitations`);
    return Object.assign(data.invitations, {
      created_at: new Date(data.invitations.created_at),
      type: "invitation",
    });
  }

  async fetchApplies(id: string): Promise<MemberOperation[] | null> {
    const client = this.getClient();
    const { data } = await client.get(`/${id}/applies`);
    return Object.assign(data.applies, {
      created_at: new Date(data.applies.created_at),
      type: "apply",
    });
  }
}

export default SpaceClient;
