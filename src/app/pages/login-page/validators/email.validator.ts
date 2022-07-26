import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { BASE_URL_GET_USER } from 'src/app/constants';
import { UserCheckResponse } from 'src/app/interfaces/server-response.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class EmailValidator {
  constructor(private http: HttpClient) {}

  static allowedDottCount(
    control: FormControl
  ): Record<string, boolean> | null {
    if (!control.value) {
      return null;
    }

    let isValid: boolean = false;

    const lastIndex: number = control.value.indexOf('@');
    const toCheck: string = control.value.slice(0, lastIndex);
    const dottCount: string[] = [...toCheck].filter(
      (item: string): boolean => item === '.'
    );

    isValid = !(dottCount.length > 3);

    return isValid ? null : { allowedDottCount: true };
  }

  static allowedDomains(control: FormControl): Record<string, boolean> | null {
    if (!control.value) {
      return null;
    }

    let isValid: boolean = false;

    const domains: string[] = ['.com', '.net', '.org', '.co', '.us'];
    const validDomain: string[] = domains.filter((item: string): boolean => {
      return control.value.endsWith(item);
    });

    isValid = !validDomain.length;

    return isValid ? { allowedDomains: true } : null;
  }

  static allowedLastLength(
    control: FormControl
  ): Record<string, boolean> | null {
    if (!control.value) {
      return null;
    }

    let isValid = false;

    const firstIndex: number = control.value.indexOf('@');
    const toCheck: string = control.value.slice(firstIndex);

    isValid = !(toCheck.length > 5);

    return isValid ? { allowedLastLength: true } : null;
  }

  isUnique(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.http
      .post<UserCheckResponse>(`${BASE_URL_GET_USER}${environment.apiKey}`, {
        identifier: control.value,
        continueUri: 'http://localhost:4200/',
      })
      .pipe(
        map((res): Record<string, boolean> | null => {
          return res.registered ? { isUnique: true } : null;
        })
      );
  }
}
