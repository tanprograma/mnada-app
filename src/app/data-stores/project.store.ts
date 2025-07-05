import {
  patchState,
  signalStore,
  withMethods,
  withState,
  withComputed,
} from '@ngrx/signals';

import { computed, inject } from '@angular/core';

import { ProjectService } from '../services/project.service';
import { Project } from '../interfaces/project.interface';

type State = {
  projects: Project[];
  filter: 'all' | 'completed' | 'pending';
};
const initialState: State = { projects: [], filter: 'all' };
export const ProjectStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ projects, filter }) => ({
    displayedProjects: computed(() => {
      switch (filter()) {
        case 'all':
          return projects();

        case 'pending':
          return projects().filter((project: Project) => !project.completed);

        case 'completed':
          return projects().filter((project: Project) => project.completed);

        default:
          throw new Error('unknown filter');
      }
    }),
  })),
  withMethods((store, projectService = inject(ProjectService)) => ({
    async getProjects(query: { [key: string]: any } = {}) {
      const projects = await projectService.getProjects(query);
      patchState(store, (state) => ({ ...state, projects: projects }));
    },
    async createProject(payload: Partial<Project>) {
      const { status, result } = await projectService.postProject(payload);
      patchState(store, (state) => ({
        ...state,
        projects: [result, ...state.projects],
      }));
      return status;
    },
    async deleteProject(id: string) {
      const res = await projectService.deleteProject(id);
      if (!!res.status) {
        patchState(store, (state) => ({
          ...state,
          projects: state.projects.filter((project) => project._id != id),
        }));
      }
    },
    async updateProject(id: string) {
      const res = await projectService.completeProject(id);
      if (!!res.status) {
        patchState(store, (state) => ({
          ...state,
          projects: state.projects.map((project) =>
            project._id == id ? res.result : project
          ),
        }));
      }
    },

    filterProjects(filter: 'all' | 'pending' | 'completed') {
      patchState(store, { filter: filter });
    },
    findProject(query: string) {
      return store
        .projects()
        .find(
          (project) => project._id == query || project.title == query
        ) as Project;
    },
  }))
);
