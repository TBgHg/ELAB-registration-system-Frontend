import type { ContentPatchRequest } from "@/types/common";
import type { CommentHead } from "@/types/thread";
import Client from "..";

class CommentClient extends Client {
  threadId: string;
  spaceId: string;
  constructor(accessToken: string, spaceId: string, threadId: string) {
    super(accessToken);
    this.threadId = threadId;
    this.spaceId = spaceId;
  }

  getClient(page: number = 1, size: number = 10) {
    const client = super.getClient();
    client.defaults.baseURL =
      (client.defaults.baseURL as string) +
      `/space/${this.spaceId}/thread/${this.threadId}/comment`;
    return client;
  }

  async createComment(content: string) {
    const client = this.getClient();
    const { data } = await client.post(``, {
      content,
    });
    return data;
  }

  async deleteComment(commentId: string) {
    const client = this.getClient();
    const { data } = await client.delete(`/${commentId}`);
    return data;
  }

  async updateComment(commentId: string, request: ContentPatchRequest) {
    const client = this.getClient();
    const { data } = await client.patch(`/${commentId}`, request);
    return data;
  }

  async getComment(
    page: number = 1,
    pageSize: number = 10
  ): Promise<CommentHead[]> {
    const client = this.getClient();
    const { data } = await client.get(``, {
      params: {
        page,
        page_size: pageSize,
      },
    });
    const { comments }: { comments: any[] } = data;
    const result = comments.map((comment) => {
      return Object.assign(comment, {
        last_update_at: new Date(comment.last_update_at * 1000),
      });
    });
    return result;
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
