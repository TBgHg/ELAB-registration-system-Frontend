import type { User } from "@/types/user";
import type { Client } from ".";

class UserClient {
  rootClient: Client;
  constructor(rootClient: Client) {
    this.rootClient = rootClient;
  }

  getClient() {
    const client = this.rootClient.getClient();
    client.defaults.baseURL = (client.defaults.baseURL as string) + "/user";
    return client;
  }

  async fetchUserInfo(openid: string): Promise<User> {
    this.rootClient.checkAccessToken();
    const client = this.getClient();
    const { data } = await client.get(`/${openid}`);
    return data;
  }
}

export default UserClient;
