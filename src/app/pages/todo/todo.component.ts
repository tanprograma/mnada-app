import { Component, inject } from '@angular/core';
import { TodoStore } from '../../data-stores/todo.store';
import { CompleteFilter } from '../../interfaces/complete-filter.interface';
import { GeneralObject } from '../../interfaces/general-object.interface';
import { Notification } from '../../data-stores/notification.store';
import { CreateTodoComponent } from '../../components/create-todo/create-todo.component';
import { DateFilterComponent } from '../../components/date-filter/date-filter.component';
import { CompletedFilterComponent } from '../../components/completed-filter/completed-filter.component';
import { CancelButtonComponent } from '../../components/cancel-button/cancel-button.component';

@Component({
  selector: 'todo',
  imports: [
    CreateTodoComponent,
    DateFilterComponent,
    CompletedFilterComponent,
    CancelButtonComponent,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  todosStore = inject(TodoStore);
  notification = inject(Notification);
  ngOnInit(): void {
    this.getTodos().then((_) => {});
  }
  async getTodos(query: GeneralObject<any> = {}) {
    await this.todosStore.getTodos(query);
  }
  async complete(id: string) {
    await this.todosStore.updateTodo(id);
  }
  async deleteTodo(id: string) {
    await this.todosStore.deleteTodo(id);
  }
  filterTodos(filter: CompleteFilter) {
    this.todosStore.filterTodos(filter);
  }
  async reset() {
    this.notification.updateNotification({
      message: 'filtering todos',
      loading: true,
    });
    await this.todosStore.getTodos();
    this.todosStore.filterTodos('all');
    this.notification.reset();
  }
}
