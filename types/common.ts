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
type ContentCreatePageType = "create" | "edit";

interface ContentPageParam {
  id: string;
}

interface ContentCreatePageParam {
  contentType: ContentType;
  pageType: ContentCreatePageType;
}

export type {
  Author,
  ContentTimeInfo,
  ContentType,
  ContentCreatePageParam,
  ContentPageParam,
};
