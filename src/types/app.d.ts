interface PostListItem {
  postId: string;
  title: string;
  createdAt: string;
}

export type PostListResponse = Array<PostListItem>;

export interface PostResponse {
  title: string;
  createdAt: string;
  hasTableOfContents: boolean;
  blocks: Array<HasChildrenBlockObject>;
}

export interface MetadataResponse {
  title?: string;
  description?: string;
  favicon?: string;
  image?: string;
}
