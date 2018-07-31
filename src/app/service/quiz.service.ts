import { Injectable } from '@angular/core';

interface Setting {
  n: Range[];
  operation: ('plus' | 'minus' | 'multiply' | 'divide')[];
  countdown: number;
  number: number;
}
interface Range {
  from: number;
  to: number;
}
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizs = [];
  countdown = 40;
  constructor() {}
  generateQuiz(setting: Setting) {
    const quizs = [];
    this.countdown = setting.countdown;
    while (quizs.length < setting.number) {
      const num = [];
      const oper = [];
      for (let i = 0; i < setting.n.length; i++) {
        const range = setting.n[i].to - setting.n[i].from;
        num.push(setting.n[i].from + Math.floor(Math.random() * range));
      }
      for (let i = 0; i < setting.n.length - 1; i++) {
        oper.push(setting.operation[Math.floor(Math.random() * setting.operation.length)]);
      }
      const test = this.calc([...num], [...oper]);
      if (test === Math.floor(test)) {
        let statement = '';
        for (let i = 0; i < setting.n.length - 1; i++) {
          statement += num[i];
          switch (oper[i]) {
            case 'plus':
              statement += ' + ';
              break;
            case 'minus':
              statement += ' - ';
              break;
            case 'divide':
              statement += ' ÷ ';
              break;
            case 'multiply':
              statement += ' x ';
              break;
          }
        }
        statement += num[num.length - 1];
        quizs.push({
          statement,
          expect: test,
          answer: null,
          time: null,
        });
      }
    }
    this.quizs = quizs;
  }

  calc(num, oper) {
    if (oper.length === 0) {
      return num[0];
    }
    for (let i = 0; i < oper.length; i++) {
      if (oper[i] === 'multiply') {
        num.splice(i, 2, num[i] * num[i + 1]);
        oper.splice(i, 1);
        return this.calc(num, oper);
      } else if (oper[i] === 'divide') {
        num.splice(i, 2, num[i] / num[i + 1]);
        oper.splice(i, 1);
        return this.calc(num, oper);
      }
    }
    for (let i = 0; i < oper.length; i++) {
      if (oper[i] === 'plus') {
        num.splice(i, 2, num[i] + num[i + 1]);
        oper.splice(i, 1);
        return this.calc(num, oper);
      } else if (oper[i] === 'minus') {
        num.splice(i, 2, num[i] - num[i + 1]);
        oper.splice(i, 1);
        return this.calc(num, oper);
      }
    }
  }
}
