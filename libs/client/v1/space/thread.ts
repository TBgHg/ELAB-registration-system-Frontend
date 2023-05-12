import type {
  ContentPatchRequest,
  ContentCreateResponse,
  ContentHeadResponse,
  ContentSearchParams,
  TodayPostResponse,
} from "@/types/common";
import type { ThreadSearchResponse } from "@/types/thread";
import Client from "..";

class ThreadClient extends Client {
  spaceId: string;

  getClient() {
    const client = super.getClient();
    client.defaults.baseURL =
      (client.defaults.baseURL as string) + `/space/${this.spaceId}/thread`;
    return client;
  }

  async getThread(threadId: string): Promise<ContentHeadResponse> {
    const client = this.getClient();
    const { data } = await client.get(`/${threadId}`);
    return Object.assign(data, {
      last_update_at: new Date(data.last_update_at * 1000),
      summary: JSON.parse(data.meta).summary,
    });
  }

  async updateThread(threadId: string, request: ContentPatchRequest) {
    const client = this.getClient();
    const { data } = await client.patch(`/${threadId}`, request);
    return data;
  }

  async todayThread(): Promise<TodayPostResponse> {
    const client = this.getClient();
    const { data } = await client.get(`/today`);
    return Object.assign(data, {
      last_update_at: new Date(data.last_update_at * 1000),
      summary: JSON.parse(data.meta).summary,
    });
  }

  constructor(accessToken: string, spaceId: string) {
    super(accessToken);
    this.spaceId = spaceId;
  }

  async createThread(
    request: ContentPatchRequest
  ): Promise<ContentCreateResponse> {
    const client = this.getClient();
    const { data } = await client.post(``, request);
    return data;
  }

  async deleteThread(threadId: string) {
    const client = this.getClient();
    const { data } = await client.delete(`/${threadId}`);
    return data;
  }

  async searchThread(
    params?: ContentSearchParams
  ): Promise<ThreadSearchResponse> {
    const client = this.getClient();
    const { data } = await client.get(``, {
      params: params === undefined ? {} : params,
    });
    return Object.assign(data, {
      threads:
        data.threads === null
          ? []
          : data.threads.map((thread) => {
              return Object.assign(thread, {
                last_update_at: new Date(thread.last_update_at * 1000),
              });
            }),
      counts: data.counts,
    });
  }

  async getThreadHistoryContent(
    threadId: string,
    historyId: string
  ): Promise<string> {
    const client = this.getClient();
    const { data } = await client.get(`/${threadId}/history/${historyId}`);
    return data.content;
  }
}

export default ThreadClient;
