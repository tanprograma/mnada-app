// import {
//   patchState,
//   signalStore,
//   withComputed,
//   withMethods,
//   withState,
// } from '@ngrx/signals';
// import { Article } from '../interfaces/article';
// import { ArticleService } from '../services/article.service';
// import { computed, inject } from '@angular/core';
// export type ArticlePreview = Pick<Article, '_id' | 'title' | 'createdAt'>;
// type ArticleStoreState = {
//   articles: ArticlePreview[];

//   article: Article | null;
// };
// const initialState: ArticleStoreState = {
//   articles: [],
//   article: null,
// };
// export const ARTICLE_STORE = signalStore(
//   { providedIn: 'root' },
//   withState(initialState),
//   withComputed((store) => ({
//     totalArticles: computed(() => {
//       return store.articles().length;
//     }),
//   })),
//   withMethods((store, articleService = inject(ArticleService)) => ({
//     async articlePreviews() {
//       const articles = await articleService.getArticlePreviews();
//       if (articles.length == 0) return;

//       patchState(store, { articles: articles });
//     },
//     async getArticle(id: string) {
//       const article = await articleService.getArticle(id);
//       patchState(store, { article: article });
//     },
//     async postArticle(payload: Partial<Article>) {
//       const { result, status } = await articleService.postArticle(payload);
//       if (!!result) {
//         const { _id, title, createdAt } = result;
//         patchState(store, ({ articles }) => ({
//           articles: [...articles, { _id, title, createdAt }],
//         }));
//       }
//     },
//   }))
// );
