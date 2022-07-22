import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-previous-searches',
  templateUrl: './previous-searches.component.html',
  styleUrls: ['./previous-searches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviousSearchesComponent implements OnInit, OnChanges {
  @Input() public newSearch!: string;
  @Output() public searchPrev: EventEmitter<string> =
    new EventEmitter<string>();

  public prevSearches!: string[] | null;

  public ngOnInit(): void {
    this.fillPrevs();
  }

  public fillPrevs(): void {
    this.prevSearches = JSON.parse(localStorage.getItem('previous-searches')!);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['newSearch'].firstChange) {
      return;
    }

    this.prevSearches = this.prevSearches
      ? this.prevSearches.concat(this.newSearch)
      : [this.newSearch];
    this.prevSearches = [...new Set(this.prevSearches)];

    localStorage.setItem(
      'previous-searches',
      JSON.stringify(this.prevSearches)
    );
  }

  public searchValue(search: string): void {
    this.searchPrev.emit(search);
  }
}
