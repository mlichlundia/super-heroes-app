import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Power } from 'src/app/interfaces/power.interface';

@Component({
  selector: 'app-power-card',
  templateUrl: './power-card.component.html',
  styleUrls: ['./power-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PowerCardComponent implements OnInit {
  @Input() public power!: Power;

  constructor() {}

  ngOnInit(): void {}
}
