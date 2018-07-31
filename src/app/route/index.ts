import { IndexComponent } from '../view/index/index.component';
import { Routes } from '../../../node_modules/@angular/router';
import { QuizComponent } from '../view/quiz/quiz.component';
import { SummaryComponent } from '../view/summary/summary.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: IndexComponent
  },
  {
    path: 'quiz',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: QuizComponent
      },
      {
        path: 'summary',
        component: SummaryComponent
      }
    ]
  }
];
