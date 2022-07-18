import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from '../../validators/password.validator';
import { EmailValidator } from '../../validators/email.validator';
import { UserValidator } from '../../validators/user.validator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  userPattern = '[a-zA-Z -]*';

  constructor(
    private emailValidator: EmailValidator,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.userPattern),
        UserValidator.usernameFormat,
      ]),
      email: new FormControl(
        '',
        [
          Validators.required,
          Validators.email,
          EmailValidator.allowedDomains,
          EmailValidator.allowedDottCount,
          EmailValidator.allowedLastLength,
        ],
        [this.emailValidator.isUnique.bind(this.emailValidator)]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        PasswordValidator.containCapitalLetter,
        PasswordValidator.allowedOneNumber,
        PasswordValidator.allowedSpecialSymbols,
      ]),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.auth.signup(this.form.value).subscribe((res) => console.log(res));
    this.form.reset();
  }

  checkCoincidence() {
    const username = this.form.get('username')?.value;
    const email = this.form.get('email')?.value;
    const passwordControl = this.form.controls['password'];

    passwordControl.addValidators([PasswordValidator.notSame(username, email)]);
  }
}
