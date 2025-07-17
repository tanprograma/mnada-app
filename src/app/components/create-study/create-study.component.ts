import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { StudyToolsStore } from '../../data-stores/study-tools.store';
import { Notification } from '../../data-stores/notification.store';

@Component({
  selector: 'create-study',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './create-study.component.html',
  styleUrl: './create-study.component.scss',
})
export class CreateStudyComponent {
  saveIcon = faSave;

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
    study: ['', Validators.required],
  });
  filterResources() {
    this.stuydToolStore.updateFilter({
      subject: this.form.value.subject ?? '',
    });
  }
  async create() {
    const subject = this.stuydToolStore.findSubject(
      this.form.value.subject ?? ''
    );
    const book = this.stuydToolStore.findBook(this.form.value.book ?? '');
    const topic = this.stuydToolStore.findTopic(this.form.value.topic ?? '');
    const status = await this.stuydToolStore.createStudy({
      title: this.form.value.study ?? '',
      subject: subject._id,
      book: book._id,
      topic: topic._id,
    });
    if (!!status) {
      this.form.patchValue({ study: '' });
    }
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
    ]);
    this.reqState.reset();
  }
}
