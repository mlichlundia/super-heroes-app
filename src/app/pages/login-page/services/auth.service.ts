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
  BASE_URL_SIGNIN,
  BASE_URL_SIGNUP,
  EMAIL_NOT_FOUND,
  INVALID_EMAIL,
  INVALID_PASSWORD,
} from 'src/app/constants';
import { BaseComponent } from 'src/app/directives/base-component.directive';
import { ServerAuthResponse } from 'src/app/interfaces/server-response.interface';
import { User } from 'src/app/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseComponent {
  private _errorsSubject: Subject<string> = new Subject<string>();
  public errors$: Observable<string> = this._errorsSubject.asObservable();

  constructor(private _http: HttpClient) {
    super();
  }

  public signup(user: User): Observable<ServerAuthResponse | null> {
    user.returnSecureToken = true;

    return this._http
      .post<ServerAuthResponse | null>(
        `${BASE_URL_SIGNUP}${environment.apiKey}`,
        user
      )
      .pipe(tap(this.setToken), takeUntil(this.componentDestroyed$));
  }

  public signin(user: User): Observable<any> {
    user.returnSecureToken = true;

    return this._http
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

  public logout() {
    this.setToken(null);
  }

  public get token(): string | null {
    const expDate = new Date(localStorage.getItem('token-exp')!);

    if (expDate < new Date()) {
      this.logout();
      return null;
    }

    return localStorage.getItem('token');
  }

  public setToken(res: ServerAuthResponse | null) {
    if (res) {
      const expDate = new Date(new Date().getTime() + +res.expiresIn * 1000);

      localStorage.setItem('token', res.idToken);
      localStorage.setItem('token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  public handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;

    switch (message) {
      case INVALID_EMAIL:
        this._errorsSubject.next('Invalid email');
        break;
      case INVALID_PASSWORD:
        this._errorsSubject.next('Invalid password');
        break;
      case EMAIL_NOT_FOUND:
        this._errorsSubject.next("This email doesn't exist");
        break;
    }

    return throwError(error);
  }
}
