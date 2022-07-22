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
  @Input() letter!: string;
  @Output() searchByLetter = new EventEmitter<string>();

  constructor() {}

  public search() {
    this.searchByLetter.emit(this.letter);
  }
}
