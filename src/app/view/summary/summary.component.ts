import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../service/quiz.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  n;
  quizs;
  correct = 0;
  incorrect = 0;
  time = 0;
  incorrectInfo = [];
  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit() {
    this.quizs = this.quizService.quizs;
    this.n = this.quizs.length;
    for (let i = 0; i < this.quizs.length; i++) {
      if (this.quizs[i].expect === Number(this.quizs[i].answer)) {
        this.correct++;
      } else {
        this.incorrect++;
        this.incorrectInfo.push(this.quizs[i]);
      }
      this.time += this.quizs[i].time;
    }
  }

  back() {
    this.router.navigate(['']);
  }
}
