import type {
  ExistingMemberOperation,
  MemberOperationRequest,
  MemberResponse,
} from "@/types/member";
import type { AxiosInstance } from "axios";
import Client from "..";

class MemberClient extends Client {
  spaceId: string;
  constructor(accessToken: string, spaceId: string) {
    super(accessToken);
    this.spaceId = spaceId;
  }

  getClient(): AxiosInstance {
    const client = super.getClient();
    client.defaults.baseURL =
      (client.defaults.baseURL as string) + `/space/${this.spaceId}/member`;
    return client;
  }

  async fetchMemberList(): Promise<MemberResponse[]> {
    const client = this.getClient();
    const { data } = await client.get(``);
    return data;
  }

  async operateMember(request: MemberOperationRequest) {
    const client = this.getClient();
    const { data } = await client.post(``, request);
    return data;
  }

  async operateExistingMember(
    memberId: string,
    operation: ExistingMemberOperation
  ) {
    const client = this.getClient();
    const { data } = await client.post(`/${memberId}`, {
      openid: memberId,
      operation,
    });
    return data;
  }

  async deleteExistingMember(memberId: string) {
    const client = this.getClient();
    const { data } = await client.delete(`/${memberId}`);
    return data;
  }
}

export default MemberClient;
