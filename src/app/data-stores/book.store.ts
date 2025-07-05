// import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

// import { inject } from '@angular/core';

// import { Created } from '../components/created/created.component';
// import { BookService } from '../services/book.service';
// import { Book } from '../interfaces/book';
// import { APP_STATE } from './app.store';

// type State = {
//   books: Book[];
//   createdBooks: Created[];
//   loading: boolean;
// };
// const initialState: State = { books: [], createdBooks: [], loading: false };
// export const BOOK_STORE = signalStore(
//   { providedIn: 'root' },
//   withState(initialState),
//   withMethods((store, bookService = inject(BookService)) => ({
//     async getBooks() {
//       const books = await bookService.getBooks();
//       patchState(store, { books: books });
//     },

//     async addBook(payload: Partial<Book>) {
//       patchState(store, { loading: true });
//       const book = await bookService.addBook(payload);
//       patchState(store, ({ createdBooks }) => ({
//         createdBooks: [{ _id: book._id, item: book.name }, ...createdBooks],
//         loading: false,
//       }));
//     },
//     async deleteBook(id: string) {
//       patchState(store, { loading: true });
//       const res = await bookService.deleteBook(id);
//       if (res) {
//         patchState(store, ({ createdBooks }) => ({
//           createdBooks: createdBooks.filter((item) => item._id != id),
//         }));
//       }
//       patchState(store, { loading: false });
//     },
//   }))
// );
