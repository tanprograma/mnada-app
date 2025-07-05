// import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

// import { inject } from '@angular/core';

// import { APP_STATE } from './app.store';
// import { StudyQuestion } from '../interfaces/exam';
// import { StudyqnService } from '../services/studyqn.service';

// export type questionsFilter = {
//   subject: string;
//   topic: string;
// };
// type State = {
//   studyQuestions: StudyQuestion[];
//   createdStudyQuestions: { item: string; _id: string }[];
//   initialized: boolean;
//   loading: boolean;
// };
// const initialState: State = {
//   studyQuestions: [],
//   createdStudyQuestions: [],
//   initialized: false,
//   loading: false,
// };
// export const STUDY_STORE = signalStore(
//   { providedIn: 'root' },
//   withState(initialState),
//   withMethods(
//     (
//       store,
//       studyService = inject(StudyqnService),
//       appStore = inject(APP_STATE)
//     ) => ({
//       initializeStore() {
//         patchState(store, { initialized: true });
//       },

//       async getQuestions(query: { topic: string }) {
//         patchState(store, { loading: true });
//         const questions = await studyService.getStudyQuestions(query);
//         patchState(store, { studyQuestions: questions, loading: false });
//       },
//       async addQuestion(payload: Partial<StudyQuestion>[]) {
//         patchState(store, { loading: true });
//         const questions = await studyService.addStudyQuestion(payload);
//         patchState(store, ({ createdStudyQuestions, studyQuestions }) => ({
//           studyQuestions: [...studyQuestions, ...questions],
//           createdquestions: [],
//           loading: false,
//         }));
//       },
//     })
//   )
// );
