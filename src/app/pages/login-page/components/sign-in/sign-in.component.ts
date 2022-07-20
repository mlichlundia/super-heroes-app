import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/directives/base-component.directive';
import { AuthService } from '../../services/auth.service';
import { EmailValidator } from '../../validators/email.validator';
import { PasswordValidator } from '../../validators/password.validator';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent extends BaseComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    private _auth: AuthService,
    private _fb: FormBuilder,
    private _router: Router
  ) {
    super();
  }

  public ngOnInit(): void {
    this.form = this._fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          EmailValidator.allowedDomains,
          EmailValidator.allowedDottCount,
          EmailValidator.allowedLastLength,
        ],
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          PasswordValidator.containCapitalLetter,
          PasswordValidator.allowedOneNumber,
          PasswordValidator.allowedSpecialSymbols,
        ],
      ],
    });
  }

  public submit() {
    if (this.form.invalid) {
      return;
    }

    this._auth
      .signin(this.form.value)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((res) => {
        console.log(res);
        this._router.navigate(['/home']);
      });
    this.form.reset();
  }

  public get emailControl() {
    return this.form.get('email');
  }

  public get passwordControl() {
    return this.form.get('password');
  }
}
