import type { ContentHeadResponse } from "./common";

interface Thread {
  thread_id: string;
  title: string;
  content: string;
}

interface ThreadSearchResponse {
  threads: null | ContentHeadResponse[];
}

export type { Thread, ThreadSearchResponse };
