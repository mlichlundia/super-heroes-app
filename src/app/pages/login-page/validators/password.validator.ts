import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ValidatorReturnValue } from 'src/app/interfaces/validatorReturnValue';

export class PasswordValidator {
  static containCapitalLetter(
    control: FormControl
  ): ValidatorReturnValue | null {
    if (!control.value) {
      return null;
    }

    const capitalLetters = control.value.split('').filter((symbol: string) => {
      if (symbol.charCodeAt(0) > 64 && symbol.charCodeAt(0) < 91) {
        return true;
      }
      return false;
    });
    const isValid = capitalLetters.length;

    return isValid ? null : { containCapitalLetter: true };
  }

  static allowedOneNumber(control: FormControl): ValidatorReturnValue | null {
    if (!control.value) {
      return null;
    }

    const numbers = control.value.split('').filter((num: string) => {
      if (num.charCodeAt(0) > 47 && num.charCodeAt(0) < 58) {
        return true;
      }
      return false;
    });
    const isValid = numbers.length;

    return isValid ? null : { allowedOneNumber: true };
  }

  static allowedSpecialSymbols(
    control: FormControl
  ): ValidatorReturnValue | null {
    if (!control.value) {
      return null;
    }

    let isValid = false;

    const symbols = ['$', '%', '.', '&', '!'];
    const validSymbols = symbols.filter((item) => {
      return [...control.value].includes(item);
    });
    isValid = validSymbols.length ? true : false;

    return isValid ? null : { allowedSpecialSymbols: true };
  }

  static notSame(username?: string, email?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const coincidence =
        control.value.indexOf(username) === -1 &&
        control.value.indexOf(email) === -1;

      return coincidence ? null : { notSame: true };
    };
  }
}
