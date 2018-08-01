import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-onscreen-keyboard',
  templateUrl: './onscreen-keyboard.component.html',
  styleUrls: ['./onscreen-keyboard.component.scss']
})
export class OnscreenKeyboardComponent implements OnInit {
  val = '';
  @Output() enter = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  clear() {
    this.val = '';
  }
  add(num) {
    window.requestAnimationFrame(() => {
      this.val += num;
    });
  }
  del() {
    if (this.val.length > 0) {
      this.val = this.val.slice(0, this.val.length - 1);
    }
  }
  submit() {
    this.enter.emit(this.val);
    this.clear();
  }
  key(e) {
    if (e.which === 13) {
      this.submit();
    }
  }
}
