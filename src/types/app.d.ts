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

interface TableOfContentsItem {
  type: "heading_1" | "heading_2" | "heading_3";
  id: string;
  text: string;
}

export type TableOfContentsInterface = Array<TableOfContentsItem>;
