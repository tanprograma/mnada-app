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
  // { path: ':userid/create-questions', component: CreateQuestionsComponent },
  // { path: ':userid/create-subjects', component: CreateSubjectComponent },
];
export default route;
