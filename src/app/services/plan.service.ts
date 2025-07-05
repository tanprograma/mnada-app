import { inject, Injectable } from '@angular/core';
import { Notification } from '../data-stores/notification.store';

import { OriginService } from './origin.service';
import { HttpService } from './http.service';
import {
  PostResponse,
  PostResponseData,
} from '../interfaces/post-response.interface';
import { Plan } from '../interfaces/plan.interface';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  origin = inject(OriginService).origin;
  http = inject(HttpService);
  notificationService = inject(Notification);
  constructor() {}
  async getPlans(options: { [key: string]: any } = {}) {
    let parsedOptions = '';
    for (let key of Object.keys(options)) {
      // excludes store id

      parsedOptions += `${key}=${options[key]}&&`;
    }
    const api = `${this.origin}/api/plans?${parsedOptions}`;
    return this.http.get<Plan[]>(api);
  }
  async postPlan(payload: Partial<Plan>) {
    this.notificationService.updateNotification({
      message: 'creating new plan',
      loading: true,
    });
    const api = `${this.origin}/api/plans/create`;
    const res = await this.http.post<Partial<Plan>, PostResponseData<Plan>>(
      api,
      payload
    );
    if (!!res.status) {
      this.notificationService.reset();
    } else {
      this.notificationService.updateNotification({
        status: false,
        message: 'plan creation failed',
      });
    }
    return res;
  }
  async deletePlan(id: string) {
    this.notificationService.updateNotification({
      message: 'deleting plan',
      loading: true,
    });
    const api = `${this.origin}/api/plans/delete/${id}`;
    const res = await this.http.delete<PostResponse>(api);
    if (!!res.status) {
      this.notificationService.reset();
    } else {
      this.notificationService.updateNotification({
        status: false,
        message: 'plan deletion failed',
      });
    }
    return res;
  }
  async completePlan(id: string) {
    this.notificationService.updateNotification({
      message: 'deleting plan',
      loading: true,
    });
    const api = `${this.origin}/api/plans/complete/${id}`;
    const res = await this.http.patch<Partial<Plan>, PostResponseData<Plan>>(
      api,
      {}
    );
    if (!!res.status) {
      this.notificationService.reset();
    } else {
      this.notificationService.updateNotification({
        status: false,
        message: 'plan update failed',
      });
    }
    return res;
  }
}
