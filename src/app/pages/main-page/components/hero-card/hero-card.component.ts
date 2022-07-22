import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Hero } from 'src/app/interfaces/hero.interface';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroCardComponent implements OnInit {
  @Input() public hero!: Hero;

  public isMyHero = false;
  public heroStorage: Hero[] = JSON.parse(localStorage.getItem('my-heroes')!);

  public ngOnInit(): void {
    this.checkIsMyHero();
  }

  public get powerups(): string[] {
    return Object.keys(this.hero.powerstats);
  }

  public checkIsMyHero(): void {
    this.isMyHero = !!this.heroStorage?.find(
      (item) => item.name === this.hero.name
    );
  }

  public selectHero(): void {
    this.heroStorage = JSON.parse(localStorage.getItem('my-heroes')!);

    this.heroStorage = this.heroStorage
      ? this.heroStorage.concat(this.hero)
      : [this.hero];

    localStorage.setItem('my-heroes', JSON.stringify(this.heroStorage));
    this.isMyHero = !this.isMyHero;
  }
}
