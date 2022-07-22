import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './pages/login-page/services/auth.service';
import { HeroesService } from './pages/main-page/services/heroes.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _auth: AuthService,
    private _heroesService: HeroesService,
    private _router: Router
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this._auth.token) {
      return true;
    } else {
      this._auth.logout();
      this._heroesService.clearPrevSearches();
      this._router.navigate(['/login'], {
        queryParams: {
          loginAgain: true,
        },
      });
      return false;
    }
  }
}
