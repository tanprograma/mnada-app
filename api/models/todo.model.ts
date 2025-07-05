import { Schema, model } from 'mongoose';
import { Todo } from '../../src/app/interfaces/todo.interface';
import { dateFilterOptions } from '../utils/date.util';

const schema = new Schema<Todo>(
  {
    completed: { type: Boolean, default: () => false },
    title: String,
  },
  { timestamps: true }
);

export const TodoModel = model('Todo', schema);
export async function findTodos(query: any) {
  const { start, end, limit } = query;
  const dateOptions = dateFilterOptions({ start, end });
  const todos = !!limit
    ? await TodoModel.find({ ...dateOptions })
        .sort({
          createdAt: -1,
        })
        .limit(parseInt(limit as string))
    : await TodoModel.find({ ...dateOptions }).sort({
        createdAt: -1,
      });
  return todos;
}
