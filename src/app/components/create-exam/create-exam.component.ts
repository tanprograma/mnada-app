import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAdd,
  faAngleDown,
  faAngleUp,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { StudyToolsStore } from '../../data-stores/study-tools.store';
import { Notification } from '../../data-stores/notification.store';
import { ExamQuestionComponent } from '../exam-question/exam-question.component';
import { MarkPayload } from '../../interfaces/exam.interface';

@Component({
  selector: 'create-exam',
  imports: [ReactiveFormsModule, FontAwesomeModule, ExamQuestionComponent],
  templateUrl: './create-exam.component.html',
  styleUrl: './create-exam.component.scss',
})
export class CreateExamComponent {
  // for state management of the request
  plusIcon = faAdd;
  reqState = inject(Notification);
  stuydToolStore = inject(StudyToolsStore);
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    subject: ['', Validators.required],
    book: ['', Validators.required],
    topic: ['', Validators.required],
    questions: [0, Validators.required],
  });

  async createExam() {
    const subject = this.stuydToolStore.findSubject(
      this.form.value.subject ?? ''
    );

    const topic = this.stuydToolStore.findTopic(this.form.value.topic ?? '');
    const book = this.stuydToolStore.findBook(this.form.value.book ?? '');
    const status = await this.stuydToolStore.createExam({
      topic: topic._id,
      subject: subject._id,
      source: book._id,
      questions: this.stuydToolStore.examCart(),
    });
    if (!!status) {
      this.form.patchValue({ topic: '' });
    }
  }
  addExamQns() {
    const qns = this.form.value.questions ?? 0;
    this.stuydToolStore.addExamQuestions(qns);
  }
  setAnswer(payload: MarkPayload) {
    this.stuydToolStore.setExamAnswer(payload);
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
    ]);
    this.reqState.reset();
  }
}
