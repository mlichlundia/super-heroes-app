import { FormControl } from '@angular/forms';
import { ValidatorReturnValue } from 'src/app/interfaces/validator-return-value.interface';

export class UserValidator {
  static usernameFormat(control: FormControl): ValidatorReturnValue | null {
    const username = control.value.trim();

    let isValid = false;
    let usernameArr = username.split(' ');
    let condition =
      usernameArr.length !== 2 ||
      usernameArr[0].length < 1 ||
      usernameArr[1].length < 1;

    if (condition) {
      usernameArr = username.split('-');
    }

    if (condition) {
      usernameArr = [...username].filter((item, idx) => {
        return idx === 0 || item === item.toUpperCase();
      });
    }

    isValid = !!(usernameArr.length === 2);

    return isValid ? null : { usernameFormat: true };
  }
}
