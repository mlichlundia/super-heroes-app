import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopUpComponent {
  @Output() public close: EventEmitter<boolean> = new EventEmitter<boolean>();

  public closePopUp(): void {
    this.close.emit();
  }
}
