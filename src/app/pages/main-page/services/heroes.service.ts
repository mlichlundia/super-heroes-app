import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Hero } from 'src/app/interfaces/hero.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(private _http: HttpClient) {}

  public getHeroes(value: string): Observable<Hero[]> {
    const heroName = value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return this._http
      .get<Hero[]>(
        `${environment.dataBase}/heroes.json?orderBy="name"&startAt="${heroName}"&endAt="${heroName}\uf8ff"`
      )
      .pipe(map((res) => Object.values(res)));
  }

  public clearPrevSearches() {
    localStorage.setItem('previous-searches', '');
  }
}
