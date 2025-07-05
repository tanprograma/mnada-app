// import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

// import { inject } from '@angular/core';

// import { Created } from '../components/created/created.component';
// import { TopicService } from '../services/topic.service';
// import { Topic } from '../interfaces/topic';
// import { APP_STATE } from './app.store';

// type State = {
//   topics: Topic[];
//   createdTopics: Created[];
//   loading: boolean;
// };
// const initialState: State = { topics: [], createdTopics: [], loading: false };
// export const TOPIC_STORE = signalStore(
//   { providedIn: 'root' },
//   withState(initialState),
//   withMethods((store, topicService = inject(TopicService)) => ({
//     async getTopics() {
//       const topics = await topicService.getTopics();
//       patchState(store, { topics: topics });
//     },

//     async addTopic(payload: Partial<Topic>) {
//       patchState(store, { loading: true });
//       const topic = await topicService.addTopic(payload);
//       patchState(store, ({ createdTopics }) => ({
//         createdTopics: [{ _id: topic._id, item: topic.name }, ...createdTopics],
//         loading: false,
//       }));
//     },
//     async deleteTopic(id: string) {
//       patchState(store, { loading: true });
//       const res = await topicService.deleteTopic(id);
//       if (res) {
//         patchState(store, ({ createdTopics }) => ({
//           createdTopics: createdTopics.filter((item) => item._id != id),
//           loading: false,
//         }));
//       }
//     },
//   }))
// );
