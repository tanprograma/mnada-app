import { Component, inject, OnInit } from '@angular/core';
import { CreateProjectComponent } from '../../components/create-project/create-project.component';
import { ProjectStore } from '../../data-stores/project.store';
import { DateFilterComponent } from '../../components/date-filter/date-filter.component';
import { CompletedFilterComponent } from '../../components/completed-filter/completed-filter.component';
import { CancelButtonComponent } from '../../components/cancel-button/cancel-button.component';
import { CompleteFilter } from '../../interfaces/complete-filter.interface';
import { GeneralObject } from '../../interfaces/general-object.interface';
import { Notification } from '../../data-stores/notification.store';

@Component({
  selector: 'project',
  imports: [
    CreateProjectComponent,
    DateFilterComponent,
    CompletedFilterComponent,
    CancelButtonComponent,
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent implements OnInit {
  projectsStore = inject(ProjectStore);
  notification = inject(Notification);
  ngOnInit(): void {
    this.getProjects().then((_) => {});
  }
  async getProjects(query: GeneralObject<any> = {}) {
    await this.projectsStore.getProjects(query);
  }
  async complete(id: string) {
    await this.projectsStore.updateProject(id);
  }
  async deleteProject(id: string) {
    await this.projectsStore.deleteProject(id);
  }
  filterProjects(filter: CompleteFilter) {
    this.projectsStore.filterProjects(filter);
  }
  async reset() {
    this.notification.updateNotification({
      message: 'filtering sales',
      loading: true,
    });
    await this.projectsStore.getProjects();
    this.projectsStore.filterProjects('all');
    this.notification.reset();
  }
}
