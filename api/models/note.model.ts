import { Schema, model } from 'mongoose';
import { Note } from '../../src/app/interfaces/study-tools.interface';

const schema = new Schema<Note>(
  {
    title: String,
    book: String,
    subject: String,
    topic: String,
  },
  { timestamps: true }
);

export const NoteModel = model('Note', schema);
