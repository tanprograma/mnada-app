import { Component, inject, OnInit } from '@angular/core';
import { CreatePlanComponent } from '../../components/create-plan/create-plan.component';
import { DateFilterComponent } from '../../components/date-filter/date-filter.component';
import { CompletedFilterComponent } from '../../components/completed-filter/completed-filter.component';
import { PlanStore } from '../../data-stores/plan.store';
import { GeneralObject } from '../../interfaces/general-object.interface';
import { CompleteFilter } from '../../interfaces/complete-filter.interface';
import { Notification } from '../../data-stores/notification.store';
import { CancelButtonComponent } from '../../components/cancel-button/cancel-button.component';
import { PlanFilterComponent } from '../../components/plan-filter/plan-filter.component';
import { ProjectStore } from '../../data-stores/project.store';

@Component({
  selector: 'plan',
  imports: [
    CreatePlanComponent,

    CancelButtonComponent,
    PlanFilterComponent,
    CompletedFilterComponent,
  ],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss',
})
export class PlanComponent implements OnInit {
  planStore = inject(PlanStore);
  projectsStore = inject(ProjectStore);
  notification = inject(Notification);
  ngOnInit(): void {
    Promise.all([this.getPlans(), this.getProjects()])
      .then((res) => {})
      .catch((err) => console.log(err));
  }
  async getPlans(query: GeneralObject<any> = {}) {
    await this.planStore.getPlans(query);
  }
  async getProjects(query: GeneralObject<any> = {}) {
    await this.projectsStore.getProjects(query);
  }
  async complete(id: string) {
    await this.planStore.updatePlan(id);
  }
  async deletePlan(id: string) {
    await this.planStore.deletePlan(id);
  }
  filterPlans(filter: CompleteFilter) {
    this.planStore.filterPlans(filter);
  }
  async reset() {
    this.notification.updateNotification({
      message: 'filtering sales',
      loading: true,
    });
    await this.planStore.getPlans();
    this.planStore.filterPlans('all');
    this.notification.reset();
  }
}
