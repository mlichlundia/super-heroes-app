import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  map,
  Observable,
  Subject,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import {
  BASE_URL_GET_USER,
  BASE_URL_SIGNIN,
  BASE_URL_SIGNUP,
} from 'src/app/constants';
import { BaseComponent } from 'src/app/directives/base-component.directive';
import { ServerAuthResponse } from 'src/app/interfaces/server-response.interface';
import { User } from 'src/app/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseComponent {
  errors$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
    super();
  }

  signup(user: User): Observable<ServerAuthResponse | null> {
    user.returnSecureToken = true;

    return this.http
      .post<ServerAuthResponse | null>(
        `${BASE_URL_SIGNUP}${environment.apiKey}`,
        user
      )
      .pipe(tap(this.setToken), takeUntil(this.componentDestroyed$));
  }

  signin(user: User): Observable<any> {
    user.returnSecureToken = true;

    return this.http
      .post<ServerAuthResponse | null>(
        `${BASE_URL_SIGNIN}${environment.apiKey}`,
        user
      )
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this)),
        takeUntil(this.componentDestroyed$)
      );
  }

  logout() {
    this.setToken(null);
  }

  get token(): string | null {
    const expDate = new Date(localStorage.getItem('token-exp')!);

    if (expDate < new Date()) {
      this.logout();
      return null;
    }
    return localStorage.getItem('token');
  }

  setToken(res: ServerAuthResponse | null) {
    if (res) {
      const expDate = new Date(new Date().getTime() + +res.expiresIn * 1000);

      localStorage.setItem('token', res.idToken);
      localStorage.setItem('token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;
    console.log(error);
    switch (message) {
      case 'INVALID_EMAIL':
        this.errors$.next('Invalid email');
        break;
      case 'INVALID_PASSWORD':
        this.errors$.next('Invalid password');
        break;
      case 'EMAIL_NOT_FOUND':
        this.errors$.next("This email doesn't exist");
        break;
    }

    return throwError(error);
  }
}
