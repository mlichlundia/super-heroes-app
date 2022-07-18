import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { EmailValidator } from '../../validators/email.validator';
import { PasswordValidator } from '../../validators/password.validator';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  sub?: Subscription;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.sub = this.auth
      .signin(this.form.value)
      .subscribe((res) => console.log(res));
    this.form.reset();
  }
}
