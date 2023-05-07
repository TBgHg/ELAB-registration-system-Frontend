import type { ContentType } from "@/types/common";
import { Client } from "..";

class Content extends Client {
  type: ContentType;
  spaceId: string;

  getClient() {
    const client = super.getClient();
    client.defaults.baseURL =
      (client.defaults.baseURL as string) + "/" + this.type;
    return client;
  }

  constructor(accessToken: string, type: ContentType, spaceId: string) {
    super(accessToken);
    this.type = type;
    this.spaceId = spaceId;
  }

  async search(name?: string, page?: number, pageSize?: number) {
    const client = this.getClient();
    return (
      await client.get("", {
        params: {
          name,
          page,
          pageSize,
        },
      })
    ).data[this.type + "s"];
  }

  async create(content: string, meta?: any) {
    throw new Error("Not implemented");
  }

  async delete(id: string) {}
}

export default Content;
