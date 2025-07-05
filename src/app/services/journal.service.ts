import { inject, Injectable } from '@angular/core';
import { Journal } from '../interfaces/journal.interface';
import { OriginService } from './origin.service';
import { HttpService } from './http.service';
import { Notification } from '../data-stores/notification.store';
import {
  PostResponse,
  PostResponseData,
} from '../interfaces/post-response.interface';

@Injectable({
  providedIn: 'root',
})
export class JournalService {
  origin = inject(OriginService).origin;
  http = inject(HttpService);
  notificationService = inject(Notification);
  constructor() {}
  async getJournals(options: { [key: string]: any } = {}) {
    let parsedOptions = '';
    for (let key of Object.keys(options)) {
      // excludes store id

      parsedOptions += `${key}=${options[key]}&&`;
    }
    const api = `${this.origin}/api/journals?${parsedOptions}`;
    return this.http.get<Journal[]>(api);
  }
  async postJournal(payload: Partial<Journal>) {
    this.notificationService.updateNotification({
      message: 'creating new Journal',
      loading: true,
    });
    const api = `${this.origin}/api/journals/create`;
    const res = await this.http.post<
      Partial<Journal>,
      PostResponseData<Journal>
    >(api, payload);
    if (!!res.status) {
      this.notificationService.updateNotification({
        status: true,
        message: 'Journal created successfully',
      });
    } else {
      this.notificationService.updateNotification({
        status: false,
        message: 'Journal creation failed',
      });
    }
    return res;
  }
  async deleteJournal(id: string) {
    this.notificationService.updateNotification({
      message: 'deleting Journal',
      loading: true,
    });
    const api = `${this.origin}/api/journals/delete/${id}`;
    const res = await this.http.delete<PostResponse>(api);
    if (!!res.status) {
      this.notificationService.updateNotification({
        status: true,
        message: 'Journal deleted successfully',
      });
    } else {
      this.notificationService.updateNotification({
        status: false,
        message: 'Journal deletion failed',
      });
    }
    return res;
  }
  async completeJournal(id: string) {
    this.notificationService.updateNotification({
      message: 'deleting Journal',
      loading: true,
    });
    const api = `${this.origin}/api/journals/complete/${id}`;
    const res = await this.http.patch<
      Partial<Journal>,
      PostResponseData<Journal>
    >(api, {});
    if (!!res.status) {
      this.notificationService.updateNotification({
        status: true,
        message: 'Journal updated successfully',
      });
    } else {
      this.notificationService.updateNotification({
        status: false,
        message: 'Journal update failed',
      });
    }
    return res;
  }
}
