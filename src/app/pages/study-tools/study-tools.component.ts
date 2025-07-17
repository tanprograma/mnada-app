import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { StudyToolsStore } from '../../data-stores/study-tools.store';
import { Notification } from '../../data-stores/notification.store';

@Component({
  selector: 'study-tools',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './study-tools.component.html',
  styleUrl: './study-tools.component.scss',
})
export class StudyToolsComponent {
  links = [
    {
      name: 'create subjects',
      url: '/study-tools/create-subjects',
    },
    {
      name: 'create books',
      url: '/study-tools/create-books',
    },
    {
      name: 'create topics',
      url: '/study-tools/create-topics',
    },
    {
      name: 'create notes',
      url: '/study-tools/create-notes',
    },
    {
      name: 'create exam',
      url: '/study-tools/create-exams',
    },
    {
      name: 'create study',
      url: '/study-tools/create-study',
    },
  ];
}
