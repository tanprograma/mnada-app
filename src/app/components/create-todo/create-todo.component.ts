import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Notification } from '../../data-stores/notification.store';
import { TodoStore } from '../../data-stores/todo.store';

@Component({
  selector: 'create-todo',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.scss',
})
export class CreateTodoComponent {
  plusIcon = faAdd;
  // angleDown = faAngleDown;
  // angleUp = faAngleUp;
  crossIcon = faTimes;

  units: { name: string; value: number }[] = [];

  // for state management of the request
  reqState = inject(Notification);
  todoStore = inject(TodoStore);
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    todo: ['', Validators.required],
  });

  async createTodo() {
    const status = await this.todoStore.createTodo({
      title: this.form.value.todo ?? '',
    });
    if (!!status) {
      this.form.patchValue({ todo: '' });
    }
  }
}
