import type { Author, ContentHeadResponse } from "./common";

interface Thread {
  thread_id: string;
  title: string;
  content: string;
}

interface ThreadSearchResponse {
  threads: ContentHeadResponse[];
  counts: number;
}

interface ThreadCommentCountsResponse {
  counts: number;
}

interface CommentHead {
  comment_id: string;
  content: string;
  last_updated_at: Date;
  author: Author;
  like_counts: number;
  likes: boolean;
}

export type {
  Thread,
  ThreadSearchResponse,
  ThreadCommentCountsResponse,
  CommentHead,
};
