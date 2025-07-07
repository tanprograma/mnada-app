import { Schema, model } from 'mongoose';

import { Subject } from '../../src/app/interfaces/study-tools.interface';

const schema = new Schema<Subject>({
  name: String,
});

export const SubjectModel = model('Subject', schema);
