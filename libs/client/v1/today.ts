import type { TodayPostResponse } from "@/types/common";
import Client from ".";

class TodayClient extends Client {
  getClient() {
    const client = super.getClient();
    client.defaults.baseURL = (client.defaults.baseURL as string) + "/today";
    return client;
  }

  async getTodayThread(): Promise<TodayPostResponse> {
    const client = this.getClient();
    const { data } = await client.get(`/thread`);
    return Object.assign(data, {
      last_update_at: new Date(data.last_update_at * 1000),
      summary: JSON.parse(data.meta).summary,
    });
  }

  async getTodayWiki(): Promise<TodayPostResponse> {
    const client = this.getClient();
    const { data } = await client.get(`/wiki`);
    return Object.assign(data, {
      last_update_at: new Date(data.last_update_at * 1000),
      summary: JSON.parse(data.meta).summary,
    });
  }
}

export default TodayClient;
