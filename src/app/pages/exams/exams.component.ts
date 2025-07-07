import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons';
import { StudyToolsStore } from '../../data-stores/study-tools.store';
import { MarkPayload } from '../../interfaces/exam.interface';
import { Notification } from '../../data-stores/notification.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'exams',
  imports: [ReactiveFormsModule, FontAwesomeModule, RouterLink],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss',
})
export class ExamsComponent implements OnInit {
  // for state management of the request
  searchIcon = faSearch;
  refreshIcon = faRefresh;
  reqState = inject(Notification);
  stuydToolStore = inject(StudyToolsStore);
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    subject: ['', Validators.required],
    book: ['', Validators.required],
    topic: ['', Validators.required],
    questions: [0, Validators.required],
  });

  async getExams() {
    // const subject = this.stuydToolStore.findSubject(
    //   this.form.value.subject ?? ''
    // );
    // const topic = this.stuydToolStore.findTopic(this.form.value.topic ?? '');
    // const book = this.stuydToolStore.findBook(this.form.value.book ?? '');
    // const status = await this.stuydToolStore.createExam({
    //   topic: topic._id,
    //   subject: subject._id,
    //   source: book._id,
    //   questions: this.stuydToolStore.examCart(),
    // });
    // if (!!status) {
    //   this.form.patchValue({ topic: '' });
    // }
  }
  reset() {
    this.stuydToolStore.getExams();
  }
  ngOnInit(): void {
    this.getResources().then((_) => {});
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
      this.stuydToolStore.getExams(),
    ]);
    this.reqState.reset();
  }
}
