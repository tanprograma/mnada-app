import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faTimes } from '@fortawesome/free-solid-svg-icons';
import { StudyToolsStore } from '../../data-stores/study-tools.store';
import { Notification } from '../../data-stores/notification.store';

@Component({
  selector: 'create-topic',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './create-topic.component.html',
  styleUrl: './create-topic.component.scss',
})
export class CreateTopicComponent implements OnInit {
  plusIcon = faAdd;

  crossIcon = faTimes;

  units: { name: string; value: number }[] = [];

  // for state management of the request
  reqState = inject(Notification);
  stuydToolStore = inject(StudyToolsStore);
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    subject: ['', Validators.required],
    book: ['', Validators.required],
    topic: ['', Validators.required],
  });

  async createTopic() {
    const subject = this.stuydToolStore.findSubject(
      this.form.value.subject ?? ''
    );
    const book = this.stuydToolStore.findBook(this.form.value.book ?? '');
    const status = await this.stuydToolStore.createTopic({
      name: this.form.value.topic ?? '',
      subject: subject._id,
      book: book._id,
    });
    if (!!status) {
      this.form.patchValue({ topic: '' });
    }
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
