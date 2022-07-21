import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Hero } from 'src/app/interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-selection-page',
  templateUrl: './selection-page.component.html',
  styleUrls: ['./selection-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionPageComponent {
  public heroes!: Observable<Hero[]>;

  constructor(public _heroService: HeroesService) {}

  public submit(searchValue: string) {
    this.heroes = this._heroService.getHeroes(searchValue);
  }
}
