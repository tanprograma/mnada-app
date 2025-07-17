import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AllertFailureComponent } from './components/allert-failure/allert-failure.component';
import { AllertSuccessComponent } from './components/allert-success/allert-success.component';
import { AllertLoadingComponent } from './components/allert-loading/allert-loading.component';
import { Notification } from './data-stores/notification.store';
import { UserComponent } from './components/user/user.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { DropdownLinksComponent } from './components/dropdown-links/dropdown-links.component';
import { UsersStore } from './data-stores/users.store';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AllertFailureComponent,
    AllertSuccessComponent,
    AllertLoadingComponent,
    UserComponent,
    FontAwesomeModule,
    DropdownLinksComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'kija mnada';
  menuIcon = faBars;
  showMenu = false;
  userStore = inject(UsersStore);
  notificationStore = inject(Notification);
  activatedRoute = inject(ActivatedRoute);
  appLinks = [
    { url: '/home', name: 'home' },
    { url: '/journals', name: 'journal' },
    { url: '/todos', name: 'todos' },
    { url: '/projects', name: 'projects' },
    { url: '/plans', name: 'plans' },
    { url: '/study-tools', name: 'study tools' },
    {
      name: 'tests',
      url: '/exams',
    },
    {
      name: 'notes',
      url: '/notes',
    },
    {
      name: 'study questions',
      url: '/study',
    },
  ];
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
