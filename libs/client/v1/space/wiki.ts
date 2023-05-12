import type {
  ContentPatchRequest,
  ContentCreateResponse,
  ContentHeadResponse,
  ContentSearchParams,
  TodayPostResponse,
} from "@/types/common";
import type { WikiSearchResponse } from "@/types/wiki";
import Client from "..";

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

  async updateWiki(wikiId: string, request: ContentPatchRequest) {
    const client = this.getClient();
    const { data } = await client.patch(`/${wikiId}`, request);
    return data;
  }

  async getWiki(wikiId: string): Promise<ContentHeadResponse> {
    const client = this.getClient();
    const { data } = await client.get(`/${wikiId}`);
    return Object.assign(data, {
      last_update_at: new Date(data.last_update_at * 1000),
      summary: JSON.parse(data.meta).summary,
    });
  }

  async createWiki(
    request: ContentPatchRequest
  ): Promise<ContentCreateResponse> {
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
    return Object.assign(data, {
      wikis:
        data.wikis === null
          ? []
          : data.wikis.map((wiki) => {
              return {
                last_update_at: new Date(wiki.last_update_at * 1000),
              };
            }),
      counts: data.counts,
    });
  }

  async todayWiki(): Promise<TodayPostResponse> {
    const client = this.getClient();
    const { data } = await client.get(`/today`);
    return Object.assign(data, {
      last_update_at: new Date(data.last_update_at * 1000),
      summary: JSON.parse(data.meta).summary,
    });
  }

  async getWikiHistoryContent(
    wikiId: string,
    historyId: string
  ): Promise<string> {
    const client = this.getClient();
    const { data } = await client.get(`/${wikiId}/history/${historyId}`);
    return data.content;
  }
}

export default WikiClient;
