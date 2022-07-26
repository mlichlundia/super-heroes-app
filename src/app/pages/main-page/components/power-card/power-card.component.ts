import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Power } from 'src/app/interfaces/power.interface';

@Component({
  selector: 'app-power-card',
  templateUrl: './power-card.component.html',
  styleUrls: ['./power-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PowerCardComponent {
  @Input() public power!: Power;
}
