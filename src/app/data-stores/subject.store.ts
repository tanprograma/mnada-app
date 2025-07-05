// import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

// import { inject } from '@angular/core';
// import { Subject } from '../interfaces/subject';
// import { Created } from '../components/created/created.component';
// import { SubjectService } from '../services/subject.service';
// import { APP_STATE } from './app.store';
// type State = {
//   subjects: Subject[];
//   createdSubjects: Created[];
//   loading: boolean;
// };
// const initialState: State = {
//   subjects: [],
//   createdSubjects: [],
//   loading: false,
// };
// export const SUBJECT_STORE = signalStore(
//   { providedIn: 'root' },
//   withState(initialState),
//   withMethods((store, subjectService = inject(SubjectService)) => ({
//     async getSubjects() {
//       const subjects = await subjectService.getSubjects();
//       patchState(store, { subjects: subjects });
//     },

//     async addSubject(payload: Partial<Subject>) {
//       patchState(store, { loading: true });
//       const subject = await subjectService.addSubject(payload);
//       patchState(store, ({ createdSubjects }) => ({
//         createdSubjects: [
//           { _id: subject._id, item: subject.name },
//           ...createdSubjects,
//         ],
//         loading: false,
//       }));
//     },
//     async deleteSubject(id: string) {
//       patchState(store, { loading: true });
//       const res = await subjectService.deleteSubject(id);
//       if (res) {
//         patchState(store, ({ createdSubjects }) => ({
//           createdSubjects: createdSubjects.filter((item) => item._id != id),
//           loading: false,
//         }));
//       }
//       patchState(store, { loading: false });
//     },
//   }))
// );
