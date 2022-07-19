import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { EmailValidator } from '../../validators/email.validator';
import { PasswordValidator } from '../../validators/password.validator';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit {
  public form!: FormGroup;

  constructor(private _auth: AuthService) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        EmailValidator.allowedDomains,
        EmailValidator.allowedDottCount,
        EmailValidator.allowedLastLength,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        PasswordValidator.containCapitalLetter,
        PasswordValidator.allowedOneNumber,
        PasswordValidator.allowedSpecialSymbols,
      ]),
    });
  }

  public submit() {
    if (this.form.invalid) {
      return;
    }

    this._auth.signin(this.form.value).subscribe((res) => console.log(res));
    this.form.reset();
  }

  public get emailControl() {
    return this.form.get('email');
  }

  public get passwordControl() {
    return this.form.get('password');
  }
}
