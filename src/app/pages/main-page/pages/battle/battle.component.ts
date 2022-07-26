import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Battle } from 'src/app/interfaces/battle.interface';
import { Hero } from 'src/app/interfaces/hero.interface';
import { Power } from 'src/app/interfaces/power.interface';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattleComponent implements OnInit {
  public myHeroes: Hero[] = JSON.parse(localStorage.getItem('my-heroes')!);
  public powerUps: Power[] = JSON.parse(localStorage.getItem('power-ups')!);
  public updatedPowerUps: Power[] = JSON.parse(
    localStorage.getItem('power-ups')!
  );
  public hero!: Hero;
  public enemy!: Hero;
  public battleResult!: Battle;
  public selected!: Power[];
  public isFighting: boolean = false;
  public showResult: boolean = false;

  constructor(private _crd: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.initHeroes();
  }

  public initHeroes(): void {
    if ((this.myHeroes && this.myHeroes?.length < 2) || !this.myHeroes) {
      return;
    }

    let enemyList: Hero[] = [];
    let randomIndex: number = 0;

    enemyList = this.myHeroes.slice(0, -1);
    randomIndex = this.getRandom(enemyList.length);

    this.hero = this.myHeroes[this.myHeroes.length - 1];
    this.enemy = enemyList[randomIndex];
  }

  public select(power: Power): void {
    if (this.selected && this.selected?.includes(power)) {
      this.selected = this.selected.filter(
        (item: Power): boolean => item !== power
      );
      this.updateHeroPower(power, false);
      this.updatePower(power, false);
      return;
    }

    this.selected = this.selected ? this.selected.concat(power) : [power];
    this.updateHeroPower(power, true);
    this.updatePower(power, true);
  }

  public updateHeroPower(power: Power, sum: boolean): void {
    const toChange: string = power.powerStatsName;
    const changeValue: number = +power.powerStatsValue;

    this.hero.powerstats[toChange] = sum
      ? this.hero.powerstats[toChange] + changeValue
      : this.hero.powerstats[toChange] - changeValue;
  }

  public updatePower(power: Power, add: boolean): void {
    this.updatedPowerUps = this.updatedPowerUps.map((item: Power): Power => {
      return item.title === power.title
        ? {
            ...item,
            usesLeft: add ? item.usesLeft - 1 : item.usesLeft + 1,
            isSpent: add ? !(item.usesLeft - 1) : !(item.usesLeft + 1),
          }
        : item;
    });
  }

  public updatePowerUps(): void {
    localStorage.setItem('power-ups', JSON.stringify(this.updatedPowerUps));
  }

  public submit(): void {
    this.isFighting = true;
    this.powerUps = this.updatedPowerUps;
    this.setBattleResult();
    this.pushToStorage();
    this.updatePowerUps();

    setTimeout(() => {
      this.isFighting = false;
      this.showResult = true;
      this._crd.markForCheck();
    }, 5000);
  }

  public pushToStorage(): void {
    const battles: Battle[] | null = localStorage.getItem('battles')
      ? JSON.parse(localStorage.getItem('battles')!).concat(this.battleResult)
      : [this.battleResult];

    localStorage.setItem('battles', JSON.stringify(battles));
  }

  public setBattleResult(): void {
    const heroPower: number = Object.values(this.hero.powerstats).reduce(
      (sum, current): number => sum + current,
      0
    );
    const enemyPower: number = Object.values(this.enemy.powerstats).reduce(
      (sum, current) => sum + current,
      0
    );

    let result: string = '';

    if (heroPower > enemyPower) {
      result = 'won';
    }

    if (heroPower < enemyPower) {
      result = 'lost';
    }

    if (heroPower === enemyPower) {
      result = 'draw';
    }

    this.battleResult = {
      date: new Date(),
      hero: this.hero,
      enemy: this.enemy,
      status: result,
    };
  }

  public getRandom(max: number): number {
    return Math.floor(Math.random() * max);
  }

  public get heroPower(): string[] {
    return Object.keys(this.hero.powerstats);
  }
}
