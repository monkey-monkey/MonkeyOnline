import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { QuizService } from '../../service/quiz.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  n = 2;
  plus = true;
  minus = true;
  multiply = false;
  divide = false;
  type = 'mixed';
  countdown = 4;
  range = [];
  number = 5;
  constructor(private router: Router, private quizService: QuizService) {}

  ngOnInit() {
    this.generateRange();
  }
  generateRange() {
    const range = [];
    for (let i = 0; i < this.n; i++) {
      if (this.range[i]) {
        range.push(this.range[i]);
      } else {
        range.push({
          from: 1,
          to: 9
        });
      }
    }
    window.requestAnimationFrame(() => {
      this.range = range;
    });
  }

  go() {
    const operation = [];
    if (this.plus) {
      operation.push('plus');
    }
    if (this.minus) {
      operation.push('minus');
    }
    if (this.divide) {
      operation.push('divide');
    }
    if (this.multiply) {
      operation.push('multiply');
    }
    try {
      this.quizService.generateQuiz({
        n: this.range,
        operation,
        countdown: Math.floor(Number(this.countdown) * 10),
        number: Number(this.number),
        type: this.type
      });
      this.router.navigate(['quiz']);
    } catch (e) {
      alert('การตั้งค่าเป็นไปได้ยากหรือเป็นไปไม่ได้ กรุณาตรวจสอบอีกครั้ง');
    }
  }
}
