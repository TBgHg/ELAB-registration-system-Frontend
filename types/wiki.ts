import type { Author } from "./common";
import type { ResponseBase } from "./server";

interface WikiHead {
  id: string;
  title: string;
  summary: string;
  author: Author;
}

interface WikiHeadServerResponse extends ResponseBase {
  wikiHeads: WikiHead[];
}

interface Wiki extends WikiHead {
  content: string;
}

export type { WikiHead, WikiHeadServerResponse, Wiki };
