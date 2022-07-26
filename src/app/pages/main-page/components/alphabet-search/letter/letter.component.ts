import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LetterComponent {
  @Input() public letter!: string;
  @Output() public searchByLetter: EventEmitter<string> =
    new EventEmitter<string>();

  public search(): void {
    this.searchByLetter.emit(this.letter);
  }
}
