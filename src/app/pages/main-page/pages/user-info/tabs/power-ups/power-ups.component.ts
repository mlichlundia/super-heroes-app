import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Power } from 'src/app/interfaces/power.interface';
import { PowerUpsService } from 'src/app/pages/main-page/services/power-ups.service';

@Component({
  selector: 'app-power-ups',
  templateUrl: './power-ups.component.html',
  styleUrls: ['./power-ups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PowerUpsComponent implements OnInit {
  public powerUps!: Power[];

  constructor(private _powerService: PowerUpsService) {}

  public ngOnInit(): void {
    this.getPower();
  }

  public getPower(): void {
    const power: Power[] = this._powerService.getPower();

    this.powerUps = [
      ...power.filter((item): boolean => !item.isSpent),
      ...power.filter((item): boolean => !!item.isSpent),
    ];
  }
}
