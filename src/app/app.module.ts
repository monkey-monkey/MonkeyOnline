import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatSelectModule,
  MatInputModule,
  MatFormFieldModule,
  MatOptionModule,
  MatIconModule
} from '@angular/material';
import { IndexComponent } from './view/index/index.component';
import { routes } from './route';
import { QuizComponent } from './view/quiz/quiz.component';
import { OnscreenKeyboardComponent } from './component/onscreen-keyboard/onscreen-keyboard.component';
import { FormsModule } from '../../node_modules/@angular/forms';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { SummaryComponent } from './view/summary/summary.component';

@NgModule({
  declarations: [AppComponent, IndexComponent, QuizComponent, OnscreenKeyboardComponent, SummaryComponent],
  imports: [
    RouterModule.forRoot(
      routes,
    ),
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    FormsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
