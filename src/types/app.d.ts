export type PostListResponse = {
  id: string;
  title: string;
  createdAt: string;
}[];

export type PostResponse = {
  title: string;
  createdAt: string;
  hasTableOfContents: boolean;
  blocks: Array<HasChildrenBlockObject>;
};
