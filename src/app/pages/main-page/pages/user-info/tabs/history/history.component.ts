import { Component, OnInit } from '@angular/core';
import { Battle } from 'src/app/interfaces/battle.interface';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  public columns = [
    'Battle date and time',
    'Hero name',
    'Opponent name',
    'Battle result',
  ];
  public battles!: Battle[];

  public ngOnInit(): void {
    this._setBattles();
  }

  private _setBattles() {
    this.battles = JSON.parse(localStorage.getItem('battles')!);
  }

  public sortByData(): void {
    this.battles = this.battles!.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    localStorage.setItem('battles', JSON.stringify(this.battles));
  }

  public sortByHero(): void {
    this.battles = this.battles!.sort((a, b) =>
      a.hero.name.localeCompare(b.hero.name)
    );

    localStorage.setItem('battles', JSON.stringify(this.battles));
  }

  public sortByEnemy(): void {
    this.battles = this.battles!.sort((a, b) =>
      a.enemy.name.localeCompare(b.enemy.name)
    );

    localStorage.setItem('battles', JSON.stringify(this.battles));
  }

  public sortByState() {
    this.battles = [
      ...this.battles!.filter((item) => item.status === 'won'),
      ...this.battles!.filter((item) => item.status === 'lost'),
      ...this.battles!.filter((item) => item.status === 'draw'),
    ];

    localStorage.setItem('battles', JSON.stringify(this.battles));
  }
}
