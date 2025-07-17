import { inject, Injectable } from '@angular/core';
import {
  Book,
  Note,
  Study,
  Subject,
  Topic,
} from '../interfaces/study-tools.interface';
import {
  PostResponse,
  PostResponseData,
} from '../interfaces/post-response.interface';
import { HttpService } from './http.service';
import { OriginService } from './origin.service';
import { Notification } from '../data-stores/notification.store';
import { Exam, ExamResult } from '../interfaces/exam.interface';

@Injectable({
  providedIn: 'root',
})
export class StudyToolsService {
  origin = inject(OriginService).origin;
  http = inject(HttpService);
  notificationService = inject(Notification);
  constructor() {}
  // books actions
  async getBooks(options: { [key: string]: any } = {}) {
    let parsedOptions = '';
    for (let key of Object.keys(options)) {
      parsedOptions += `${key}=${options[key]}&&`;
    }
    const api = `${this.origin}/api/books?${parsedOptions}`;
    return this.http.get<Book[]>(api);
  }
  async postBook(payload: Partial<Book>) {
    this.notificationService.updateNotification({
      message: 'creating new book',
      loading: true,
    });
    const api = `${this.origin}/api/books/create`;
    const res = await this.http.post<Partial<Book>, PostResponseData<Book>>(
      api,
      payload
    );
    if (!!res.status) {
      this.notificationService.reset();
    } else {
      this.notificationService.updateNotification({
        status: false,
        message: 'book creation failed',
      });
    }
    return res;
  }
  // topics actions
  async getTopics(options: { [key: string]: any } = {}) {
    let parsedOptions = '';
    for (let key of Object.keys(options)) {
      parsedOptions += `${key}=${options[key]}&&`;
    }
    const api = `${this.origin}/api/topics?${parsedOptions}`;
    return this.http.get<Topic[]>(api);
  }
  async postTopic(payload: Partial<Topic>) {
    this.notificationService.updateNotification({
      message: 'creating new topic',
      loading: true,
    });
    const api = `${this.origin}/api/topics/create`;
    const res = await this.http.post<Partial<Topic>, PostResponseData<Topic>>(
      api,
      payload
    );
    if (!!res.status) {
      this.notificationService.reset();
    } else {
      this.notificationService.updateNotification({
        status: false,
        message: 'topic creation failed',
      });
    }
    return res;
  }
  // subject actions
  async getSubjects(options: { [key: string]: any } = {}) {
    let parsedOptions = '';
    for (let key of Object.keys(options)) {
      parsedOptions += `${key}=${options[key]}&&`;
    }
    const api = `${this.origin}/api/subjects?${parsedOptions}`;
    return this.http.get<Subject[]>(api);
  }
  async postSubject(payload: Partial<Subject>) {
    this.notificationService.updateNotification({
      message: 'creating new subject',
      loading: true,
    });
    const api = `${this.origin}/api/subjects/create`;
    const res = await this.http.post<
      Partial<Subject>,
      PostResponseData<Subject>
    >(api, payload);
    if (!!res.status) {
      this.notificationService.reset();
    } else {
      this.notificationService.updateNotification({
        status: false,
        message: 'subject creation failed',
      });
    }
    return res;
  }
  // exams actions
  async getExams(options: { [key: string]: any } = {}) {
    let parsedOptions = '';
    for (let key of Object.keys(options)) {
      parsedOptions += `${key}=${options[key]}&&`;
    }
    const api = `${this.origin}/api/exams?${parsedOptions}`;
    return this.http.get<Exam[]>(api);
  }
  async getExam(id: string) {
    const api = `${this.origin}/api/exams/selected-exam/${id}`;
    return this.http.get<Exam>(api);
  }
  async postExam(payload: Partial<Exam>) {
    this.notificationService.updateNotification({
      message: 'creating new exam',
      loading: true,
    });
    const api = `${this.origin}/api/exams/create`;
    const res = await this.http.post<Partial<Exam>, PostResponseData<Exam>>(
      api,
      payload
    );
    if (!!res.status) {
      this.notificationService.updateNotification({
        message: 'exam created successfully',
        status: true,
      });
    } else {
      this.notificationService.updateNotification({
        status: false,
        message: 'exam creation failed',
      });
    }
    return res;
  }
  async postExamResult(payload: Partial<ExamResult>) {
    this.notificationService.updateNotification({
      message: 'posing test results',
      loading: true,
    });
    const api = `${this.origin}/api/results/create`;
    const res = await this.http.post<Partial<ExamResult>, PostResponse>(
      api,
      payload
    );
    if (!!res.status) {
      this.notificationService.updateNotification({
        message: 'results saved successfully',
        status: true,
      });
    } else {
      this.notificationService.updateNotification({
        status: false,
        message: 'result save failed',
      });
    }
    return res;
  }
  async getNotes(options: { [key: string]: any } = {}) {
    let parsedOptions = '';
    for (let key of Object.keys(options)) {
      parsedOptions += `${key}=${options[key]}&&`;
    }
    const api = `${this.origin}/api/notes?${parsedOptions}`;
    return this.http.get<Note[]>(api);
  }

  async postNote(payload: Partial<Note>) {
    this.notificationService.updateNotification({
      message: 'creating new note',
      loading: true,
    });
    const api = `${this.origin}/api/notes/create`;
    const res = await this.http.post<Partial<Note>, PostResponseData<Note>>(
      api,
      payload
    );
    if (!!res.status) {
      this.notificationService.reset();
    } else {
      this.notificationService.updateNotification({
        status: false,
        message: 'note creation failed',
      });
    }
    return res;
  }
  async getStudy(options: { [key: string]: any } = {}) {
    let parsedOptions = '';
    for (let key of Object.keys(options)) {
      parsedOptions += `${key}=${options[key]}&&`;
    }
    const api = `${this.origin}/api/study?${parsedOptions}`;
    return this.http.get<Study[]>(api);
  }

  async postStudy(payload: Partial<Study>) {
    this.notificationService.updateNotification({
      message: 'creating new study question',
      loading: true,
    });
    const api = `${this.origin}/api/study/create`;
    const res = await this.http.post<Partial<Study>, PostResponseData<Study>>(
      api,
      payload
    );
    if (!!res.status) {
      this.notificationService.reset();
    } else {
      this.notificationService.updateNotification({
        status: false,
        message: 'study creation failed',
      });
    }
    return res;
  }
}
