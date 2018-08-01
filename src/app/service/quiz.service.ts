import { Injectable } from '@angular/core';

interface Setting {
  n: Range[];
  operation: ('plus' | 'minus' | 'multiply' | 'divide')[];
  countdown: number;
  number: number;
  type: string;
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
    let err = 0;
    for (let i = 0; i < setting.n.length; i++) {
      setting.n[i].from = Number(setting.n[i].from);
      setting.n[i].to = Number(setting.n[i].to);
    }
    while (quizs.length < setting.number) {
      if (err > 100000) {
        throw err;
      }
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
      if (test === Math.floor(test) && test < 2000000000 && test > -2000000000) {
        if (
          (setting.type === 'positive' && test >= 0) ||
          (setting.type === 'negative' && test <= 0) ||
          setting.type === 'mixed'
        ) {
          let statement = '';
          for (let i = 0; i < setting.n.length - 1; i++) {
            if (num[i] < 0) {
              statement += '(' + num[i] + ')';
            } else {
              statement += num[i];
            }
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
          statement +=
            (num[num.length - 1] < 0 ? '(' : '') + num[num.length - 1] + (num[num.length - 1] < 0 ? ')' : '');
          quizs.push({
            statement,
            expect: test,
            answer: null,
            time: null
          });
        } else {
          err++;
        }
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
