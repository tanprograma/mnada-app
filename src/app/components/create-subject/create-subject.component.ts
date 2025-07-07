import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StudyToolsStore } from '../../data-stores/study-tools.store';
import { faAdd, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Notification } from '../../data-stores/notification.store';

@Component({
  selector: 'create-subject',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './create-subject.component.html',
  styleUrl: './create-subject.component.scss',
})
export class CreateSubjectComponent {
  plusIcon = faAdd;
  // angleDown = faAngleDown;
  // angleUp = faAngleUp;
  crossIcon = faTimes;

  units: { name: string; value: number }[] = [];

  // for state management of the request
  reqState = inject(Notification);
  stuydToolStore = inject(StudyToolsStore);
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    subject: ['', Validators.required],
  });

  async createSubject() {
    const status = await this.stuydToolStore.createSubject({
      name: this.form.value.subject ?? '',
    });
    if (!!status) {
      this.form.patchValue({ subject: '' });
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
    await this.stuydToolStore.getSubjects();
    this.reqState.reset();
  }
}
