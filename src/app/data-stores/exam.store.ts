// import {
//   patchState,
//   signalStore,
//   withComputed,
//   withMethods,
//   withState,
// } from '@ngrx/signals';

// import { computed, inject } from '@angular/core';
// import { Choice, Exam, ExamResult, Result } from '../interfaces/exam';
// import { ExamService } from '../services/exam.service';
// export interface ExamPreview extends Pick<Exam, '_id' | 'book' | 'topic'> {
//   questions: number;
// }
// export interface ResultPreview extends Pick<Exam, '_id' | 'book' | 'topic'> {
//   questions: number;
//   score: { fraction: string; percentage: number };
// }
// type State = {
//   exams: ExamPreview[];
//   tests: ExamResult[];
//   selectedExam: Exam;
//   initialized: boolean;
//   loading: boolean;
//   //   selects the id and the questions...
// };
// const initialState: State = {
//   loading: false,
//   initialized: false,
//   exams: [],
//   tests: [],
//   selectedExam: { _id: '', questions: [], book: '', topic: '', subject: '' },
// };
// export const EXAM_STORE = signalStore(
//   { providedIn: 'root' },
//   withState(initialState),
//   withComputed(({ selectedExam }) => ({
//     score: computed(() => {
//       const score = selectedExam().questions.filter(
//         (q) => q.option == q.selected
//       ).length;
//       const qns = selectedExam().questions.length;
//       return `${score}/${qns} `;
//     }),
//     scorePercentage: computed(() => {
//       const score = selectedExam().questions.filter(
//         (q) => q.option == q.selected
//       ).length;
//       const qns = selectedExam().questions.length;
//       return Math.round((score * 100) / qns);
//     }),
//   })),
//   withMethods((store, examService = inject(ExamService)) => ({
//     initializeStore() {
//       patchState(store, { initialized: true });
//     },
//     async getExamPreviews() {
//       const exams = await examService.getExamPreviews();
//       patchState(store, { exams: exams });
//     },
//     async getExam(id: string) {
//       const exam = await examService.getExam(id);
//       patchState(store, ({ selectedExam }) => ({
//         selectedExam: exam,
//       }));
//     },
//     async addExam(payload: Partial<Exam>) {
//       patchState(store, { loading: true });
//       const exam = await examService.createExam(payload);
//       patchState(store, ({ exams }) => ({
//         loading: false,
//         exams: [
//           ...exams,
//           {
//             _id: exam._id,
//             book: exam.book,
//             topic: exam.topic,
//             questions: exam.questions.length,
//           },
//         ],
//       }));
//     },
//     async saveExamResults() {
//       patchState(store, { loading: true });
//       const exam = await examService.saveExamResults({
//         book: store.selectedExam.book(),
//         topic: store.selectedExam.topic(),
//         subject: store.selectedExam.subject(),
//         questions: store.selectedExam.questions(),
//       });
//       patchState(store, ({ selectedExam }) => ({
//         selectedExam: exam,
//         loading: false,
//       }));
//     },
//     selectExamChoice({ sn, option }: Pick<Choice, 'option' | 'sn'>) {
//       patchState(store, ({ selectedExam }) => ({
//         selectedExam: {
//           ...selectedExam,
//           questions: selectedExam.questions.map((qn) =>
//             qn.sn == sn ? { ...qn, selected: option } : qn
//           ),
//         },
//       }));
//     },
//   }))
// );
