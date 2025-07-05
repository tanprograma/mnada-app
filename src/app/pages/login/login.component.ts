import { Component, inject } from '@angular/core';
import { Router } from 'express';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsersStore } from '../../data-stores/users.store';
import { Notification } from '../../data-stores/notification.store';
import { User } from '../../interfaces/user.interface';
@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // router = inject(Router);
  formBuilder = inject(FormBuilder);
  usersStore = inject(UsersStore);
  notification = inject(Notification);
  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  ngOnInit(): void {
    this.usersStore.restoreSession();
  }
  async login(): Promise<void> {
    this.notification.updateNotification({
      loading: true,
      message: 'logging in..',
    });
    const user: Partial<User> = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? '',
    };
    const status = await this.usersStore.login(user);
    if (!!status) {
      this.notification.reset();
    } else {
      this.notification.updateNotification({
        status: false,
        message: 'could not login...try again',
      });
    }
  }
}
