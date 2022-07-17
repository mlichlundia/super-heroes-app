import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ValidatorReturnValue } from '../../../interfaces/validatorReturnValue';

export class EmailValidator {
  static allowedDottCount(control: FormControl): ValidatorReturnValue | null {
    let isValid = false;

    const lastIndex = control.value.indexOf('@');
    const toCheck = control.value.slice(0, lastIndex);
    const dottCount: string[] = [];

    [...toCheck].forEach((item: string) => {
      if (item === '.') {
        dottCount.push(item);
      }
    });

    isValid = dottCount.length > 4 ? false : true;

    return isValid ? null : { allowedDottCount: true };
  }

  static allowedDomains(control: FormControl): ValidatorReturnValue | null {
    let isValid = false;

    const domains = ['.com', '.net', '.org', '.co', '.us'];
    const validDomain = domains.filter((item) => {
      return control.value.endsWith(item);
    });

    isValid = validDomain.length ? false : true;

    return isValid ? { allowedDomains: true } : null;
  }

  static allowedLastLength(control: FormControl): ValidatorReturnValue | null {
    let isValid = false;

    const firstIndex = control.value.indexOf('@');
    const toCheck = control.value.slice(firstIndex);

    isValid = toCheck.length > 5 ? false : true;

    return isValid ? { allowedLastLength: true } : null;
  }
}
