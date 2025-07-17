import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { StudyToolsStore } from '../../data-stores/study-tools.store';
import { Notification } from '../../data-stores/notification.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'study',
  imports: [ReactiveFormsModule, FontAwesomeModule, RouterLink],
  templateUrl: './study.component.html',
  styleUrl: './study.component.scss',
})
export class StudyComponent {
  searchIcon = faSearch;

  resetIcon = faRefresh;

  // for state management of the request
  reqState = inject(Notification);
  stuydToolStore = inject(StudyToolsStore);
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    subject: ['', Validators.required],
    book: ['', Validators.required],
    topic: ['', Validators.required],
  });
  filterResources() {
    this.stuydToolStore.updateFilter({
      subject: this.form.value.subject ?? '',
    });
  }
  async searchNotes() {
    let query: { [key: string]: any } = {};
    if (!!this.form.value.subject) {
      const subject = this.stuydToolStore.findSubject(
        this.form.value.subject ?? ''
      );
      query['subject'] = subject;
    }
    if (!!this.form.value.book) {
      const book = this.stuydToolStore.findBook(this.form.value.book ?? '');
      query['book'] = book;
    }
    if (!!this.form.value.topic) {
      const topic = this.stuydToolStore.findTopic(this.form.value.topic ?? '');
      query['topic'] = topic;
    }
    this.reqState.updateNotification({
      message: 'searching study questions..',
      loading: true,
    });
    await this.stuydToolStore.getStudy(query);
    this.reqState.reset();
  }
  async reset() {
    this.stuydToolStore.getStudy({ limit: 20 });
  }
  ngOnInit(): void {
    this.getResources().then((_) => {});
  }
  ngOnDestroy(): void {
    this.stuydToolStore.resetFilter();
  }
  async getResources() {
    this.reqState.updateNotification({
      message: 'loading resources',
      loading: true,
    });
    await Promise.all([
      this.stuydToolStore.getBooks(),
      this.stuydToolStore.getSubjects(),
      this.stuydToolStore.getTopics(),
      this.stuydToolStore.getStudy({ limit: 20 }),
    ]);
    this.reqState.reset();
  }
}
