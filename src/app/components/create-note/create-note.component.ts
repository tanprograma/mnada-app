import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Notification } from '../../data-stores/notification.store';
import { StudyToolsStore } from '../../data-stores/study-tools.store';

@Component({
  selector: 'create-note',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './create-note.component.html',
  styleUrl: './create-note.component.scss',
})
export class CreateNoteComponent {
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
    note: ['', Validators.required],
  });
  filterResources() {
    this.stuydToolStore.updateFilter({
      subject: this.form.value.subject ?? '',
    });
  }
  async createNote() {
    const subject = this.stuydToolStore.findSubject(
      this.form.value.subject ?? ''
    );
    const book = this.stuydToolStore.findBook(this.form.value.book ?? '');
    const topic = this.stuydToolStore.findTopic(this.form.value.topic ?? '');
    const status = await this.stuydToolStore.createNote({
      title: this.form.value.note ?? '',
      subject: subject._id,
      book: book._id,
      topic: topic._id,
    });
    if (!!status) {
      this.form.patchValue({ note: '' });
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
