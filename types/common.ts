interface Author {
  name: string;
  avatar: string;
  openid: string;
}

interface ContentTimeInfo {
  createdAt: Date;
  editedAt?: Date;
}

type ContentType = "wiki" | "thread" | "comment";
type ContentPatchType = "create" | "edit";

interface ContentPageParam {
  id: string;
}

interface ContentPatchPageParam {
  contentType: ContentType;
  pageType: ContentPatchType;
}

interface ContentHeadResponse {
  content_id: string;
  current_history_id: string;
  last_update_at: Date;
  title: string;
  summary: string;
  author: Author;
  like_counts: number;
  likes: boolean;
}

interface ContentHistoryResponse {
  content: string;
}

type OrderType = "time_desc" | "like_desc";

interface ContentCreateRequest {
  space_id: string;
  title: string;
  content: string;
}

interface ContentSearchParams {
  space_id: string;
  order: OrderType;
  name: string;
  page: number;
  page_size: number;
}

function createEmptyContentHeadResponse(): ContentHeadResponse {
  return {
    content_id: "",
    current_history_id: "",
    last_update_at: new Date(),
    title: "",
    summary: "",
    author: {
      name: "",
      avatar: "",
      openid: "",
    },
    like_counts: 0,
    likes: false,
  };
}

export type {
  Author,
  OrderType,
  ContentTimeInfo,
  ContentType,
  ContentPatchPageParam,
  ContentPatchType,
  ContentPageParam,
  ContentCreateRequest,
  ContentHeadResponse,
  ContentHistoryResponse,
  ContentSearchParams,
};

export { createEmptyContentHeadResponse };
