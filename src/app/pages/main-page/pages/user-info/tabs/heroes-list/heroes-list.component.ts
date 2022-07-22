import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/interfaces/hero.interface';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss'],
})
export class HeroesListComponent implements OnInit {
  public heroes: Hero[] = JSON.parse(localStorage.getItem('my-heroes')!);
  public selected!: Hero;

  public ngOnInit(): void {
    this._showHeroes();
    this._setSelected();
  }

  private _showHeroes(): void {
    this.heroes = JSON.parse(localStorage.getItem('my-heroes')!);
  }

  private _setSelected() {
    this.selected = this.heroes[this.heroes.length - 1];
  }
}
