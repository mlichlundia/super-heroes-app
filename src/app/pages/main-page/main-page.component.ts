import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { PowerUpsService } from './services/power-ups.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {
  public preventFight: boolean = false;

  constructor(
    private _powerService: PowerUpsService,
    private _router: Router,
    private _cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this._powerService.setPower();
  }

  public openBattle(): void {
    const heroes = localStorage.getItem('my-heroes')
      ? JSON.parse(localStorage.getItem('my-heroes')!)
      : [];

    if (heroes.length > 1) {
      this._router.navigate(['/home', 'battle']);
    } else {
      this.preventFight = true;

      setTimeout(() => {
        this.preventFight = false;
        this._cdr.markForCheck();
      }, 3500);
    }
  }
}
