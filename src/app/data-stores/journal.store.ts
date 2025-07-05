import {
  patchState,
  signalStore,
  withMethods,
  withState,
  withComputed,
} from '@ngrx/signals';

import { computed, inject } from '@angular/core';
import { Journal } from '../interfaces/journal.interface';
import { JournalService } from '../services/journal.service';
import { DateService } from '../services/date.service';

type State = {
  journals: Journal[];
};
const initialState: State = { journals: [] };
export const JournalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ journals }, dateService = inject(DateService)) => ({
    displayedJournal: computed(() => {
      return journals().map((item) => {
        const createdAt = dateService.getTimeAndDateString(item.createdAt);
        return { ...item, createdAt };
      });
    }),
  })),
  withMethods((store, journalService = inject(JournalService)) => ({
    async getJournals(query: { [key: string]: any } = {}) {
      const journals = await journalService.getJournals(query);
      patchState(store, (state) => ({ ...state, journals: journals }));
    },
    async createJournal(payload: Partial<Journal>) {
      const { status, result } = await journalService.postJournal(payload);
      patchState(store, (state) => ({
        ...state,
        journals: [result, ...state.journals],
      }));
      return status;
    },
    async deleteJournal(id: string) {
      const res = await journalService.deleteJournal(id);
      if (!!res.status) {
        patchState(store, (state) => ({
          ...state,
          journals: state.journals.filter((journal) => journal._id != id),
        }));
      }
    },
  }))
);
