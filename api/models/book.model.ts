import { Schema, model } from 'mongoose';
import { Book } from '../../src/app/interfaces/study-tools.interface';

const schema = new Schema<Book>({
  name: String,
  subject: String,
});

export const BookModel = model('Book', schema);
