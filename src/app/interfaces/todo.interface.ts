import { spec } from 'node:test/reporters';

export interface Todo {
  createdAt: string;
  updatedAt: string;
  completed: boolean;
  _id: string;
  title: string;
}
