import type { User } from "@/types/user";
import type { Client } from ".";
import { createApiServerClient } from ".";

class UserClient {
  rootClient: Client;
  constructor(rootClient: Client) {
    this.rootClient = rootClient;
  }

  async fetchUserInfo(openid: string): Promise<User> {
    this.rootClient.checkAccessToken();
    const client = createApiServerClient(this.rootClient.accessToken);
    const { data } = await client.get(`/user/${openid}`);
    return data;
  }
}

export default UserClient;
