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
    console.log(this.battles);
  }

  private _setBattles() {
    this.battles = JSON.parse(localStorage.getItem('battles')!);
  }

  public sortByData(): void {
    this.battles = this.battles!.sort(
      (a, b) => new Date(a.date).getDate() - new Date(b.date).getDate()
    );

    localStorage.setItem('battles', JSON.stringify(this.battles));
  }

  public sortByHero(): void {
    this.battles = this.battles!.sort((a, b) => {
      if (a.hero < b.hero) {
        return -1;
      }

      if (a.hero > b.hero) {
        return 1;
      }

      return 0;
    });

    localStorage.setItem('battles', JSON.stringify(this.battles));
  }

  public sortByEnemy(): void {
    this.battles = this.battles!.sort((a, b) => {
      if (a.enemy < b.enemy) {
        return -1;
      }

      if (a.enemy > b.enemy) {
        return 1;
      }

      return 0;
    });

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
