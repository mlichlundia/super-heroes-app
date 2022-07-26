import { FormControl } from '@angular/forms';

export class UserValidator {
  static usernameFormat(control: FormControl): Record<string, boolean> | null {
    if (!control.value) {
      return null;
    }

    const username: string = control.value.trim();

    let isValid: boolean = false;
    let usernameArr: string[] = username.split(' ');
    let condition: boolean =
      usernameArr.length !== 2 ||
      usernameArr[0].length < 1 ||
      usernameArr[1].length < 1;

    if (condition) {
      usernameArr = username.split('-');
    }

    if (condition) {
      usernameArr = [...username].filter(
        (item: string, idx: number): string | boolean => {
          return idx === 0 || item === item.toUpperCase();
        }
      );
    }

    isValid = !!(usernameArr.length === 2);

    return isValid ? null : { usernameFormat: true };
  }
}
