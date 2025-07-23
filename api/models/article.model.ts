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
const schema = new Schema<Article>(
  {
    title: String,
    secondaryTitle: String,
    author: String,
    contents: [contentSchema],
  },
  { timestamps: true }
);

export const ArticleModel = model('Article', schema);
