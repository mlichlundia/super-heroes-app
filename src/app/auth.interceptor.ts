import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './pages/login-page/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _auth: AuthService, private _router: Router) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this._auth.token) {
      req = req.clone({ setParams: { auth: this._auth.token } });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('[Interseptor error]: ', error);

        if (error.status === 401) {
          this._auth.logout();
          this._router.navigate(['/login'], {
            queryParams: { loginAgain: true },
          });
        }

        return throwError(error);
      })
    );
  }
}
