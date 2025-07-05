import { inject, Injectable } from '@angular/core';
import { OriginService } from './origin.service';
import { HttpService } from './http.service';
import { Notification } from '../data-stores/notification.store';
import { Todo } from '../interfaces/todo.interface';
import {
  PostResponse,
  PostResponseData,
} from '../interfaces/post-response.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  origin = inject(OriginService).origin;
  http = inject(HttpService);
  notificationService = inject(Notification);
  constructor() {}
  async getTodos(options: { [key: string]: any } = {}) {
    let parsedOptions = '';
    for (let key of Object.keys(options)) {
      // excludes store id

      parsedOptions += `${key}=${options[key]}&&`;
    }
    const api = `${this.origin}/api/todos?${parsedOptions}`;
    return this.http.get<Todo[]>(api);
  }
  async postTodo(payload: Partial<Todo>) {
    this.notificationService.updateNotification({
      message: 'creating new todo',
      loading: true,
    });
    const api = `${this.origin}/api/todos/create`;
    const res = await this.http.post<Partial<Todo>, PostResponseData<Todo>>(
      api,
      payload
    );
    if (!!res.status) {
      this.notificationService.reset();
    } else {
      this.notificationService.updateNotification({
        status: false,
        message: 'todo creation failed',
      });
    }
    return res;
  }
  async deleteTodo(id: string) {
    this.notificationService.updateNotification({
      message: 'deleting todo',
      loading: true,
    });
    const api = `${this.origin}/api/todos/delete/${id}`;
    const res = await this.http.delete<PostResponse>(api);
    if (!!res.status) {
      this.notificationService.reset();
    } else {
      this.notificationService.updateNotification({
        status: false,
        message: 'todo deletion failed',
      });
    }
    return res;
  }
  async completeTodo(id: string) {
    this.notificationService.updateNotification({
      message: 'deleting todo',
      loading: true,
    });
    const api = `${this.origin}/api/todos/complete/${id}`;
    const res = await this.http.patch<Partial<Todo>, PostResponseData<Todo>>(
      api,
      {}
    );
    if (!!res.status) {
      this.notificationService.reset();
    } else {
      this.notificationService.updateNotification({
        status: false,
        message: 'todo update failed',
      });
    }
    return res;
  }
}
