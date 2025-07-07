import { Schema, model } from 'mongoose';
import { Exam } from '../../src/app/interfaces/exam.interface';

const qnSchema = new Schema<{ answer: string; selected: string }>(
  {
    answer: String,
    selected: String,
  },
  { _id: false }
);
const schema = new Schema<Exam>({
  subject: String,
  source: String,
  topic: String,
  questions: [qnSchema],
});

export const ExamModel = model('Exam', schema);
