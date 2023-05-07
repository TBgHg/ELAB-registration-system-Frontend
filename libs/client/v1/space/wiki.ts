import type {
  ContentCreateRequest,
  ContentHistoryResponse,
  ContentSearchParams,
} from "@/types/common";
import type { WikiSearchResponse } from "@/types/wiki";
import { Client } from "..";

class WikiClient extends Client {
  spaceId: string;

  getClient() {
    const client = super.getClient();
    client.defaults.baseURL =
      (client.defaults.baseURL as string) + `/space/${this.spaceId}/wiki`;
    return client;
  }

  constructor(accessToken: string, spaceId: string) {
    super(accessToken);
    this.spaceId = spaceId;
  }

  async createWiki(request: ContentCreateRequest) {
    const client = this.getClient();
    const { data } = await client.post(``, request);
    return data;
  }

  async deleteWiki(wikiId: string) {
    const client = this.getClient();
    const { data } = await client.delete(`/${wikiId}`);
    return data;
  }

  async searchWiki(params?: ContentSearchParams): Promise<WikiSearchResponse> {
    const client = this.getClient();
    const { data } = await client.get(``, {
      params: params === undefined ? {} : params,
    });
    return data;
  }

  async getWikiHistoryContent(
    wikiId: string,
    historyId: string
  ): Promise<ContentHistoryResponse> {
    const client = this.getClient();
    const { data } = await client.get(`/${wikiId}/history/${historyId}`);
    return data;
  }
}

export default WikiClient;
