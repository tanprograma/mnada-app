import { inject, Injectable } from '@angular/core';

import {
  PostResponse,
  PostResponseData,
} from '../interfaces/post-response.interface';
import { HttpService } from './http.service';
import { OriginService } from './origin.service';
import { Notification } from '../data-stores/notification.store';
import { Project } from '../interfaces/project.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  origin = inject(OriginService).origin;
  http = inject(HttpService);
  notificationService = inject(Notification);
  constructor() {}
  async getProjects(options: { [key: string]: any } = {}) {
    let parsedOptions = '';
    for (let key of Object.keys(options)) {
      // excludes store id

      parsedOptions += `${key}=${options[key]}&&`;
    }
    const api = `${this.origin}/api/projects?${parsedOptions}`;
    return this.http.get<Project[]>(api);
  }
  async postProject(payload: Partial<Project>) {
    this.notificationService.updateNotification({
      message: 'creating new project',
      loading: true,
    });
    const api = `${this.origin}/api/projects/create`;
    const res = await this.http.post<
      Partial<Project>,
      PostResponseData<Project>
    >(api, payload);
    if (!!res.status) {
      this.notificationService.reset();
    } else {
      this.notificationService.updateNotification({
        status: false,
        message: 'project creation failed',
      });
    }
    return res;
  }
  async deleteProject(id: string) {
    this.notificationService.updateNotification({
      message: 'deleting project',
      loading: true,
    });
    const api = `${this.origin}/api/projects/delete/${id}`;
    const res = await this.http.delete<PostResponse>(api);
    if (!!res.status) {
      this.notificationService.reset();
    } else {
      this.notificationService.updateNotification({
        status: false,
        message: 'project deletion failed',
      });
    }
    return res;
  }
  async completeProject(id: string) {
    this.notificationService.updateNotification({
      message: 'deleting project',
      loading: true,
    });
    const api = `${this.origin}/api/projects/complete/${id}`;
    const res = await this.http.patch<
      Partial<Project>,
      PostResponseData<Project>
    >(api, {});
    if (!!res.status) {
      this.notificationService.reset();
    } else {
      this.notificationService.updateNotification({
        status: false,
        message: 'project update failed',
      });
    }
    return res;
  }
}
