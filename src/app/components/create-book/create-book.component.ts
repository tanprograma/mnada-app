import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { faAdd, faTimes } from '@fortawesome/free-solid-svg-icons';
import { StudyToolsStore } from '../../data-stores/study-tools.store';
import { Notification } from '../../data-stores/notification.store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'create-book',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.scss',
})
export class CreateBookComponent {
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
  });

  async createBook() {
    const subject = this.stuydToolStore.findSubject(
      this.form.value.subject ?? ''
    );
    const status = await this.stuydToolStore.createBook({
      name: this.form.value.book ?? '',
      subject: subject._id,
    });
    if (!!status) {
      this.form.patchValue({ book: '' });
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
    ]);
    this.reqState.reset();
  }
}
