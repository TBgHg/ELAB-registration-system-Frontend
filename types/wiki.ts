import type { Author } from "./common";
import type { ResponseBase } from "./server";

interface WikiHead {
  id: string;
  title: string;
  summary: string;
  author: Author;
}

interface WikiHeadServerResponse extends ResponseBase {
  data: {
    wikiHeads: WikiHead[];
  };
}

interface Wiki extends WikiHead {
  content: string;
}

interface WikiServerResponse extends ResponseBase {
  data: {
    wiki: Wiki;
  };
}

export type { WikiHead, WikiHeadServerResponse, Wiki, WikiServerResponse };
