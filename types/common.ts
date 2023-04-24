interface Author {
  name: string;
  avatar: string;
  openid: string;
}

interface ContentTimeInfo {
  createdAt: Date;
  editedAt?: Date;
}

export type { Author, ContentTimeInfo };
