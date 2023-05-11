import type { ContentHeadResponse } from "./common";

interface Wiki {
  wiki_id: string;
  title: string;
  content: string;
}

interface WikiSearchResponse {
  wikis: ContentHeadResponse[];
  counts: number;
}

export type { Wiki, WikiSearchResponse };
