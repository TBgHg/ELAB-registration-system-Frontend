import type { Author } from "./common";

interface WikiHead {
  id: string;
  title: string;
  summary: string;
  author: Author;
}

interface WikiHeadServerResponse {
  wikiHeads: WikiHead[];
}

interface Wiki extends WikiHead {
  content: string;
}

export type { WikiHead, WikiHeadServerResponse, Wiki };
