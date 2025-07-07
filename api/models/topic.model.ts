import { Schema, model } from 'mongoose';
import { Topic } from '../../src/app/interfaces/study-tools.interface';

const schema = new Schema<Topic>({
  name: String,
  book: String,
  subject: String,
});

export const TopicModel = model('Topic', schema);
