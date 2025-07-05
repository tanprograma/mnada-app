import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Notification } from '../../data-stores/notification.store';
import { ProjectStore } from '../../data-stores/project.store';

@Component({
  selector: 'create-project',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss',
})
export class CreateProjectComponent {
  plusIcon = faAdd;
  // angleDown = faAngleDown;
  // angleUp = faAngleUp;
  crossIcon = faTimes;

  units: { name: string; value: number }[] = [];

  // for state management of the request
  reqState = inject(Notification);
  projectStore = inject(ProjectStore);
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    project: ['', Validators.required],
    description: ['', Validators.required],
  });

  async createProject() {
    const status = await this.projectStore.createProject({
      title: this.form.value.project ?? '',
      description: this.form.value.description ?? '',
    });
    if (!!status) {
      this.form.patchValue({ project: '', description: '' });
    }
  }
}
