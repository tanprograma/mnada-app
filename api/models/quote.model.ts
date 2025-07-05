import { Schema, model } from 'mongoose';
import { Quote } from '../../src/app/data-stores/quote.store';

const schema = new Schema<Quote>({
  title: String,
  author: String,
});

export const QuoteModel = model('Quote', schema);
