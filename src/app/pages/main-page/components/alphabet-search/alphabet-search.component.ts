import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-alphabet-search',
  templateUrl: './alphabet-search.component.html',
  styleUrls: ['./alphabet-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AlphabetSearchComponent {
  public letters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  public currentLetter = 'a';
  public isOpen = false;

  @Output() searchByLetter = new EventEmitter<string>();

  constructor() {}

  public changeLetter(letter: string) {
    this.currentLetter = letter;
  }

  public toggle() {
    this.isOpen = !this.isOpen;
  }

  public search(letter: string) {
    this.changeLetter(letter);
    this.toggle();
    this.searchByLetter.emit(letter);
  }
}
