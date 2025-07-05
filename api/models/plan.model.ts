import { Schema, model } from 'mongoose';
import { Plan } from '../../src/app/interfaces/plan.interface';
import { dateFilterOptions } from '../utils/date.util';

const schema = new Schema<Plan>(
  {
    title: String,
    completed: { type: Boolean, default: () => false },
    project: String,
  },
  { timestamps: true }
);

export const PlanModel = model('Plan', schema);
export async function findPlans(query: any) {
  const { start, end, limit, project } = query;
  const dateOptions = dateFilterOptions({ start, end });
  const allOptions = !!project ? { ...dateOptions, project } : dateOptions;
  const plans = !!limit
    ? await PlanModel.find(allOptions)
        .sort({
          createdAt: -1,
        })
        .limit(parseInt(limit as string))
    : await PlanModel.find(allOptions).sort({
        createdAt: -1,
      });
  return plans;
}
