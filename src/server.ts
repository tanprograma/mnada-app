import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
try {
  dotenv.config();
} catch (error) {
  console.error(error);
}
import users from '../api/routes/user.api';
// import notes from '../api/routes/notes.mjs';
import topics from '../api/routes/topic.api';
import books from '../api/routes/book.api';
import subjects from '../api/routes/subject.api';
import quotes from '../api/routes/quote.api';
import todos from '../api/routes/todo.api';
import plans from '../api/routes/plan.api';
import articles from '../api/routes/article.api';
import exams from '../api/routes/exam.api';
import results from '../api/routes/exam-result.api';

import projects from '../api/routes/project.api';
// import studyqns from '../api/routes/studyqns';
import journals from '../api/routes/journal.api';

const appDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(appDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 *
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */
app.use(express.json());

app.use('/api/users', users);
// app.use('/api/notes', notes);
app.use('/api/exams', exams);
app.use('/api/results', results);
// app.use('/api/study', studyqns);
app.use('/api/projects', projects);
app.use('/api/books', books);

app.use('/api/quotes', quotes);
app.use('/api/todos', todos);
app.use('/api/plans', plans);
app.use('/api/articles', articles);
app.use('/api/topics', topics);
app.use('/api/subjects', subjects);
app.use('/api/journals', journals);
/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next()
    )
    .catch(next);
});

/**
 * Start the app if this module is the main entry point.
 * The app listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  const DATABASE_URL = process.env['DATABASE_URL'] as string;

  app.listen(port, () => {
    console.log(`Node Express app listening on http://localhost:${port}`);
    mongoose
      .connect(DATABASE_URL)
      .then(() => {
        console.log(`database ${DATABASE_URL} connected successfully`);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

/**
 * Request handler used by the Angular CLI (for dev-app and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
