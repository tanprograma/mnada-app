import { Schema, model } from 'mongoose';
import { Journal } from '../../src/app/interfaces/journal.interface';
import { dateFilterOptions } from '../utils/date.util';

const schema = new Schema<Journal>(
  {
    entry: String,
  },
  { timestamps: true }
);

export const JournalModel = model('Journal', schema);

export async function findJournals(query: any) {
  const { start, end, limit } = query;
  const dateOptions = dateFilterOptions({ start, end });
  const journals = !!limit
    ? await JournalModel.find({ ...dateOptions })
        .sort({
          createdAt: -1,
        })
        .limit(parseInt(limit as string))
    : await JournalModel.find({ ...dateOptions }).sort({
        createdAt: -1,
      });
  return journals;
}
