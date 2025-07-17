import { Schema, model } from 'mongoose';
import { Study } from '../../src/app/interfaces/study-tools.interface';

const schema = new Schema<Study>({
  title: String,
  book: String,
  subject: String,
  topic: String,
});

export const StudyModel = model('Study', schema);
