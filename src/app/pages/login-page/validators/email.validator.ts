import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { BASE_URL_GET_USER } from 'src/app/constants';
import { UserCheckResponse } from 'src/app/interfaces/serverResponse';
import { environment } from 'src/environments/environment';
import { ValidatorReturnValue } from '../../../interfaces/validatorReturnValue';

@Injectable({ providedIn: 'root' })
export class EmailValidator {
  constructor(private http: HttpClient) {}

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

  isUnique(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.http
      .post<UserCheckResponse>(`${BASE_URL_GET_USER}${environment.apiKey}`, {
        identifier: control.value,
        continueUri: 'http://localhost:4200/',
      })
      .pipe(
        map((res) => {
          return res.registered ? { isUnique: true } : null;
        })
      );
  }
}
