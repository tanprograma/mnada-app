import { Schema, model } from 'mongoose';
import { ExamResult } from '../../src/app/interfaces/exam.interface';

const qnSchema = new Schema<{ answer: string; selected: string }>(
  {
    answer: String,
    selected: String,
  },
  { _id: false }
);
const schema = new Schema<ExamResult>(
  {
    testID: String,
    subject: String,
    source: String,
    topic: String,
    questions: [qnSchema],
  },
  { timestamps: true }
);

export const ResultsModel = model('Results', schema);
