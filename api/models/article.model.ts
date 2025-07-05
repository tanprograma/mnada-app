import { Schema, model } from 'mongoose';
import {
  Article,
  ArticleItem,
} from '../../src/app/interfaces/article.interface';

const contentSchema = new Schema<ArticleItem>({
  author: String,
  tag: String,
  content: String,
});
const schema = new Schema<Article>({
  author: String,
  contents: [contentSchema],
});

export const ArticleModel = model('Article', schema);
// export interface Article {
//   createdAt: String;
//   updatedAt: string;
//   author: string;
//   _id: string;
//   contents: ArticleItem[];
// }
// export interface ArticleItem {
//   tag: 'paragraph';
//   content: string;
//   author?: string;
// }
