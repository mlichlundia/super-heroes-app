import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap, takeUntil, tap } from 'rxjs';
import { BaseComponent } from 'src/app/directives/base-component.directive';
import { Hero } from 'src/app/interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero-info',
  templateUrl: './hero-info.component.html',
  styleUrls: ['./hero-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroInfoComponent extends BaseComponent implements OnInit {
  public hero!: Hero;

  constructor(
    private _heroesService: HeroesService,
    private _route: ActivatedRoute,
    private _cdr: ChangeDetectorRef
  ) {
    super();
  }

  public ngOnInit(): void {
    this.getHero();
  }

  public getHero(): void {
    this._route.params
      .pipe(
        switchMap((params: Params): Observable<Hero> => {
          return this._heroesService.getById(params['id']);
        }),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((hero: Hero) => {
        this.hero = hero;
        this._cdr.markForCheck();
      });
  }

  public getProperties(property: keyof Hero): string[] {
    return Object.keys(this.hero[property]);
  }
}
