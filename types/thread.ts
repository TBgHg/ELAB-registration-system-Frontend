import type { ContentHeadResponse } from "./common";

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

export type { Thread, ThreadSearchResponse, ThreadCommentCountsResponse };
