import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizService } from '../../service/quiz.service';
import { Breakpoints, BreakpointObserver } from '../../../../node_modules/@angular/cdk/layout';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  quizs = [];
  current;
  isMobile = false;
  countdown;
  intervalTime;
  constructor(private quizService: QuizService, breakpointObserver: BreakpointObserver, private router: Router) {
    breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  ngOnInit() {
    this.countdown = this.quizService.countdown;
    this.quizs = this.quizService.quizs;
    if (this.quizs.length > 0) {
      this.current = 0;
    }
    this.intervalTime = setInterval(() => {
      if (this.current === this.quizs.length) {
        this.summary();
      }
      if (this.countdown > 0) {
        this.countdown -= 1;
      } else {
        this.countdown = this.quizService.countdown;
        this.quizs[this.current].time = this.quizService.countdown;
        this.current += 1;
      }
    }, 100);
  }
  submit(e) {
    if (this.current < this.quizs.length) {
      this.quizs[this.current].answer = e;
      this.quizs[this.current].time = (this.quizService.countdown - this.countdown) / 10;
      this.countdown = this.quizService.countdown;
      this.current += 1;
    }
    if (this.current === this.quizs.length) {
      this.summary();
    }
  }
  summary() {
    this.quizService.quizs = this.quizs;
    this.router.navigate(['quiz', 'summary']);
  }
  ngOnDestroy() {
    clearInterval(this.intervalTime);
  }
}
