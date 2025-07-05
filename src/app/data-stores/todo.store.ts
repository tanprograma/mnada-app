import {
  patchState,
  signalStore,
  withMethods,
  withState,
  withComputed,
} from '@ngrx/signals';

import { computed, inject } from '@angular/core';
import { Todo } from '../interfaces/todo.interface';
import { TodoService } from '../services/todo.service';

type State = {
  todos: Todo[];
  filter: 'all' | 'completed' | 'pending';
};
const initialState: State = { todos: [], filter: 'all' };
export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ todos, filter }) => ({
    displayedTodos: computed(() => {
      switch (filter()) {
        case 'all':
          return todos();

        case 'pending':
          return todos().filter((Todo: Todo) => !Todo.completed);

        case 'completed':
          return todos().filter((Todo: Todo) => Todo.completed);

        default:
          throw new Error('unknown filter');
      }
    }),
  })),
  withMethods((store, todoService = inject(TodoService)) => ({
    async getTodos(query: { [key: string]: any } = {}) {
      const todos = await todoService.getTodos(query);
      patchState(store, (state) => ({ ...state, todos: todos }));
    },
    async createTodo(payload: Partial<Todo>) {
      const { status, result } = await todoService.postTodo(payload);
      patchState(store, (state) => ({
        ...state,
        todos: [result, ...state.todos],
      }));
      return status;
    },
    async deleteTodo(id: string) {
      const res = await todoService.deleteTodo(id);
      if (!!res.status) {
        patchState(store, (state) => ({
          ...state,
          todos: state.todos.filter((Todo) => Todo._id != id),
        }));
      }
    },
    async updateTodo(id: string) {
      const res = await todoService.completeTodo(id);
      if (!!res.status) {
        patchState(store, (state) => ({
          ...state,
          todos: state.todos.map((Todo) =>
            Todo._id == id ? res.result : Todo
          ),
        }));
      }
    },

    filterTodos(filter: 'all' | 'pending' | 'completed') {
      patchState(store, { filter: filter });
    },
  }))
);
