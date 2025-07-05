export interface Quote {
  createdAt: String;
  updatedAt: string;
  _id: string;
  title: string;
  author: String;
}

// import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

// import { inject } from '@angular/core';
// import { Quote } from '../interfaces/quote';
// import { QuoteService } from '../services/quote.service';
// import { Created } from '../components/created/created.component';
// type State = {
//   quotes: Quote[];
//   createdQuotes: Created[];
//   loading: boolean;
// };
// const initialState: State = { quotes: [], createdQuotes: [], loading: false };
// export const QUOTE_STATE = signalStore(
//   { providedIn: 'root' },
//   withState(initialState),
//   withMethods((store, quoteService = inject(QuoteService)) => ({
//     async getQuotes() {
//       const quotes = await quoteService.getQuotes();
//       patchState(store, { quotes: quotes });
//     },
//     async createQuote(payload: Partial<Quote>) {
//       patchState(store, { loading: true });
//       const quote = await quoteService.addQuote(payload);

//       patchState(store, ({ createdQuotes }) => ({
//         createdQuotes: [
//           { _id: quote._id, item: quote.title },
//           ...createdQuotes,
//         ],
//         loading: false,
//       }));
//     },
//     async deleteQuote(id: string) {
//       patchState(store, { loading: true });
//       const quote = await quoteService.deleteQuote(id);
//       1;
//       patchState(store, ({ quotes }) => ({
//         quotes: quotes.filter((q) => q._id !== id),
//         loading: false,
//       }));
//     },
//   }))
// );
