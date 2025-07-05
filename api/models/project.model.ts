import { Schema, model } from 'mongoose';

import { dateFilterOptions } from '../utils/date.util';
import { Project } from '../../src/app/interfaces/project.interface';

const schema = new Schema<Project>(
  {
    title: String,
    completed: { type: Boolean, default: () => false },
    description: String,
  },
  { timestamps: true }
);

export const ProjectModel = model('Project', schema);
export async function findProjects(query: any) {
  const { start, end, limit } = query;
  const dateOptions = dateFilterOptions({ start, end });
  const projects = !!limit
    ? await ProjectModel.find({ ...dateOptions })
        .sort({
          createdAt: -1,
        })
        .limit(parseInt(limit as string))
    : await ProjectModel.find({ ...dateOptions }).sort({
        createdAt: -1,
      });
  return projects;
}
