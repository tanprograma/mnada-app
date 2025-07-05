import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type State = {
  message: string;
  loading: boolean;
  status: boolean | undefined;
};
const initialState: State = {
  message: '',
  loading: false,
  status: undefined,
};
export const Notification = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((store) => ({
    updateNotification(
      options: Partial<{ message: string; status?: boolean; loading: boolean }>
    ) {
      patchState(store, (state) => ({ ...state, ...options }));
    },
    reset() {
      patchState(store, { message: '', loading: false, status: undefined });
    },
  }))
);
