import { Schema, model } from 'mongoose';
import { User } from '../../src/app/interfaces/user.interface';

const schema = new Schema<User>({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  role: String,
});

export const UserModel = model('User', schema);
