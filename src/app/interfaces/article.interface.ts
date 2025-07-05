export interface Article {
  createdAt: string;
  updatedAt: string;
  author: string;
  _id: string;
  contents: ArticleItem[];
}
export interface ArticleItem {
  tag: string;
  content: string;
  author?: string;
}
