import type { ContentHeadResponse } from "./common";

interface Wiki {
  wiki_id: string;
  title: string;
  content: string;
}

interface WikiSearchResponse {
  wikis: null | ContentHeadResponse[];
}

export type { Wiki, WikiSearchResponse };
