import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class LoginPageComponent implements OnInit {
  isNew = false;

  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.isNew = !this.isNew;
  }
}
