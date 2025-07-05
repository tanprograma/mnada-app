import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Notification } from '../../data-stores/notification.store';
import { PlanStore } from '../../data-stores/plan.store';
import { ProjectStore } from '../../data-stores/project.store';

@Component({
  selector: 'create-plan',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './create-plan.component.html',
  styleUrl: './create-plan.component.scss',
})
export class CreatePlanComponent {
  plusIcon = faAdd;
  // angleDown = faAngleDown;
  // angleUp = faAngleUp;
  crossIcon = faTimes;

  units: { name: string; value: number }[] = [];

  // for state management of the request
  reqState = inject(Notification);
  planStore = inject(PlanStore);
  projectStore = inject(ProjectStore);
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    plan: ['', Validators.required],
    project: ['', Validators.required],
  });

  async createPlan() {
    const status = await this.planStore.createPlan({
      title: this.form.value.plan ?? '',
      project: this.projectStore.findProject(this.form.value.project ?? '')._id,
    });
    if (!!status) {
      this.form.patchValue({ plan: '', project: '' });
    }
  }
}
