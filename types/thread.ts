import type { Author } from "./common";
import type { ResponseBase } from "./server";

interface Comment {
  /**
   * 评论的UUID。
   */
  id: string;
  /**
   * 评论的内容。
   */
  content: string;
  /**
   * 楼中楼，不一定有
   */
  replyTo?: string;
  /**
   * 作者
   */
  author: Author;
  /**
   * 是否点赞
   */
  liked: boolean;
}

interface CommentServerResponse extends ResponseBase {
  data: {
    comments: Comment[];
  };
}

interface ThreadHead {
  /**
   * 帖子的UUID。
   */
  id: string;
  /**
   * 帖子的标题，可以留空，以便在后续抓取数据时自动获取。
   */
  title?: string;
  /**
   * 帖子的摘要，可以留空，以便在后续抓取数据时自动获取。
   */
  summary?: string;
}

interface Thread extends ThreadHead {
  content: string;
  title: string;
  summary: string;
}

interface ThreadHeadServerResponse extends ResponseBase {
  data: {
    threadHeads: ThreadHead[];
  };
}

interface ThreadServerResponse extends ResponseBase {
  data: {
    thread: Thread;
  };
}

interface CommentCountsServerResponse extends ResponseBase {
  data: {
    counts: number;
  };
}

function createEmptyThreadHead(): ThreadHead {
  return {
    id: "",
  };
}

function createEmptyComment(): Comment {
  return {
    id: "",
    content: "",
    author: {
      name: "",
      avatar: "",
      openid: "",
    },
    liked: false,
  };
}

export type {
  Comment,
  CommentServerResponse,
  CommentCountsServerResponse,
  Thread,
  ThreadHead,
  ThreadHeadServerResponse,
  ThreadServerResponse,
};
export { createEmptyThreadHead, createEmptyComment };
