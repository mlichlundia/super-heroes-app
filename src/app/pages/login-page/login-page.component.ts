import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class LoginPageComponent implements OnInit {
  public isNew = false;
  public message = '';

  constructor(public auth: AuthService, private _route: ActivatedRoute) {}

  public ngOnInit(): void {
    this._route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message =
          'Your current session has expired. Please login again to continue using this app';
      }
    });
  }

  public toggle() {
    this.isNew = !this.isNew;
  }
}
