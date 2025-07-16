import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
// import { NotesComponent } from '../pages/notes/notes.component';
// import { QuotesComponent } from '../pages/quotes/quotes.component';
// import { QuestionsComponent } from '../pages/questions/questions.component';
// import { TodoComponent } from '../pages/todo/todo.component';
import { ArticlesComponent } from '../pages/articles/articles.component';
// import { ProjectsComponent } from '../pages/projects/projects.component';
// import { PlansComponent } from '../pages/plans/plans.component';
import { AdminComponent } from '../pages/admin/admin.component';
import { ReadingRoomComponent } from '../pages/reading-room/reading-room.component';
import { HomeComponent } from '../pages/home/home.component';
import { ProjectComponent } from '../pages/project/project.component';
import { PlanComponent } from '../pages/plan/plan.component';
import { TodoComponent } from '../pages/todo/todo.component';
import { JournalComponent } from '../pages/journal/journal.component';
import { StudyToolsComponent } from '../pages/study-tools/study-tools.component';
import { CreateSubjectComponent } from '../components/create-subject/create-subject.component';
import { CreateBookComponent } from '../components/create-book/create-book.component';
import { CreateTopicComponent } from '../components/create-topic/create-topic.component';
import { CreateExamComponent } from '../components/create-exam/create-exam.component';
import { ExamsComponent } from '../pages/exams/exams.component';
import { TakeTestComponent } from '../pages/take-test/take-test.component';
import { CreateNoteComponent } from '../components/create-note/create-note.component';
import { NotesComponent } from '../pages/notes/notes.component';

const route: Routes = [
  { path: '', redirectTo: '/journals', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  // { path: 'notes', component: NotesComponent },
  // { path: 'quotes', component: QuotesComponent },
  // { path: 'questions', component: QuestionsComponent },
  { path: 'todos', component: TodoComponent },
  { path: 'journals', component: JournalComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'reading-room/:id', component: ReadingRoomComponent },
  { path: 'projects', component: ProjectComponent },
  { path: 'plans', component: PlanComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'exams', component: ExamsComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'take-test/:testID', component: TakeTestComponent },
  {
    path: 'study-tools',
    component: StudyToolsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/study-tools/create-subjects',
      },
      { path: 'create-subjects', component: CreateSubjectComponent },
      { path: 'create-books', component: CreateBookComponent },
      { path: 'create-topics', component: CreateTopicComponent },
      { path: 'create-exams', component: CreateExamComponent },
      { path: 'create-notes', component: CreateNoteComponent },
    ],
  },
  // { path: ':userid/create-questions', component: CreateQuestionsComponent },
  // { path: ':userid/create-subjects', component: CreateSubjectComponent },
];
export default route;
