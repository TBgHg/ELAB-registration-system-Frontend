import type {
  ContentCreateRequest,
  ContentHistoryResponse,
  ContentSearchParams,
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

  constructor(accessToken: string, spaceId: string) {
    super(accessToken);
    this.spaceId = spaceId;
  }

  async createThread(request: ContentCreateRequest) {
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
          ? null
          : data.threads.map((thread) => {
              return {
                last_update_at: new Date(thread.last_update_at),
              };
            }),
    });
  }

  async getThreadHistoryContent(
    threadId: string,
    historyId: string
  ): Promise<ContentHistoryResponse> {
    const client = this.getClient();
    const { data } = await client.get(`/${threadId}/history/${historyId}`);
    return data;
  }
}

export default ThreadClient;
