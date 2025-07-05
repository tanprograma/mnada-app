// import {
//   patchState,
//   signalStore,
//   withComputed,
//   withMethods,
//   withState,
// } from '@ngrx/signals';
// import { Book } from '../interfaces/book';
// import { Subject } from '../interfaces/subject';
// import { Topic } from '../interfaces/topic';
// import { BookService } from '../services/book.service';
// import { computed, inject } from '@angular/core';
// import { SubjectService } from '../services/subject.service';
// import { TopicService } from '../services/topic.service';
// // import { LoggedUser } from './user.store';
// // import { UserService } from '../services/user.service';
// import { User } from '../interfaces/user';
// import { AppService } from '../services/app.service';
// import { switchScan } from 'rxjs';

// type State = {
//   booted: boolean;
//   books: Book[];
//   subjects: Subject[];
//   topics: Topic[];
//   subjectFilter: string;
//   // user: LoggedUser | null;
//   loading: boolean;
//   // loggedIn: boolean;
// };
// const initialState: State = {
//   subjectFilter: '',
//   loading: false,
//   booted: false,
//   books: [],
//   subjects: [],
//   topics: [],
//   // user: null,
// };
// export const APP_STATE = signalStore(
//   { providedIn: 'root' },
//   withState(initialState),
//   withComputed((store) => ({
//     filteredBooks: computed(() => {
//       switch (store.subjectFilter()) {
//         case '':
//           return [];

//         default:
//           return store
//             .books()
//             .filter((book) => book.subject == store.subjectFilter());
//       }
//     }),
//     filteredTopics: computed(() => {
//       switch (store.subjectFilter()) {
//         case '':
//           return [];

//         default:
//           return store
//             .topics()
//             .filter((item) => item.subject == store.subjectFilter());
//       }
//     }),
//   })),
//   withMethods(
//     (
//       store,
//       bookService = inject(BookService),
//       subjectService = inject(SubjectService),
//       topicService = inject(TopicService)
//     ) => ({
//       toggleLoadState() {
//         patchState(store, ({ loading }) => ({ loading: !loading }));
//       },

//       setSubjectFilter(subject: string) {
//         patchState(store, { subjectFilter: subject });
//       },

//       async configApp() {
//         patchState(store, { loading: true });
//         const [books, topics, subjects] = await Promise.all([
//           bookService.getBooks(),
//           topicService.getTopics(),
//           subjectService.getSubjects(),
//         ]);

//         patchState(store, (state) => ({
//           books: books,
//           topics: topics,
//           subjects: subjects,
//           loading: false,
//         }));
//       },
//     })
//   )
// );
