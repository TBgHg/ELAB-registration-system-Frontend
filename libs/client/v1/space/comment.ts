import type { ContentCreateRequest } from "@/types/common";
import Client from "..";

class CommentClient extends Client {
  threadId: string;
  constructor(accessToken: string, threadId: string) {
    super(accessToken);
    this.threadId = threadId;
  }

  getClient() {
    const client = super.getClient();
    client.defaults.baseURL =
      (client.defaults.baseURL as string) + `/thread/${this.threadId}/comment`;
    return client;
  }

  async createComment(request: ContentCreateRequest) {
    const client = this.getClient();
    const { data } = await client.post(``, request);
    return data;
  }

  async deleteComment(commentId: string) {
    const client = this.getClient();
    const { data } = await client.delete(`/${commentId}`);
    return data;
  }

  async updateComment(commentId: string, request: ContentCreateRequest) {
    const client = this.getClient();
    const { data } = await client.patch(`/${commentId}`, request);
    return data;
  }

  async getComment() {
    const client = this.getClient();
    const { data } = await client.get(``);
    return data;
  }

  async likeComment(commentId: string) {
    const client = this.getClient();
    const { data } = await client.post(`/${commentId}/like`);
    return data;
  }

  async unlikeComment(commentId: string) {
    const client = this.getClient();
    const { data } = await client.delete(`/${commentId}/like`);
    return data;
  }
}

export default CommentClient;
