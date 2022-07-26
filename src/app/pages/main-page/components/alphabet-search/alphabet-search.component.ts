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
  public letters: string[] = [
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
  public currentLetter: string = 'a';
  public isOpen: boolean = false;

  @Output() public searchByLetter: EventEmitter<string> =
    new EventEmitter<string>();

  public changeLetter(letter: string): void {
    this.currentLetter = letter;
  }

  public toggle(): void {
    this.isOpen = !this.isOpen;
  }

  public search(letter: string): void {
    this.changeLetter(letter);
    this.toggle();
    this.searchByLetter.emit(letter);
  }
}
