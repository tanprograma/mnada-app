import {
  patchState,
  signalStore,
  withMethods,
  withState,
  withComputed,
} from '@ngrx/signals';

import { PlanService } from '../services/plan.service';
import { computed, inject } from '@angular/core';
import { Plan } from '../interfaces/plan.interface';

type State = {
  plans: Plan[];
  filter: 'all' | 'completed' | 'pending';
};
const initialState: State = { plans: [], filter: 'all' };
export const PlanStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ plans, filter }) => ({
    displayedPlans: computed(() => {
      switch (filter()) {
        case 'all':
          return plans();

        case 'pending':
          return plans().filter((plan: Plan) => !plan.completed);

        case 'completed':
          return plans().filter((plan: Plan) => plan.completed);

        default:
          throw new Error('unknown filter');
      }
    }),
  })),
  withMethods((store, planService = inject(PlanService)) => ({
    async getPlans(query: { [key: string]: any } = {}) {
      const plans = await planService.getPlans(query);
      patchState(store, (state) => ({ ...state, plans: plans }));
    },
    async createPlan(payload: Partial<Plan>) {
      const { status, result } = await planService.postPlan(payload);
      patchState(store, (state) => ({
        ...state,
        plans: [result, ...state.plans],
      }));
      return status;
    },
    async deletePlan(id: string) {
      const res = await planService.deletePlan(id);
      if (!!res.status) {
        patchState(store, (state) => ({
          ...state,
          plans: state.plans.filter((plan) => plan._id != id),
        }));
      }
    },
    async updatePlan(id: string) {
      const res = await planService.completePlan(id);
      if (!!res.status) {
        patchState(store, (state) => ({
          ...state,
          plans: state.plans.map((plan) =>
            plan._id == id ? res.result : plan
          ),
        }));
      }
    },

    filterPlans(filter: 'all' | 'pending' | 'completed') {
      patchState(store, { filter: filter });
    },
  }))
);
