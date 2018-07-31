import { Component } from '@angular/core';
import { DomSanitizer } from '../../node_modules/@angular/platform-browser';
import { MatIconRegistry } from '../../node_modules/@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MonkeyOnline';
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'keyboard_arrow_left',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-keyboard_arrow_left-24px.svg')
    );
  }
}
