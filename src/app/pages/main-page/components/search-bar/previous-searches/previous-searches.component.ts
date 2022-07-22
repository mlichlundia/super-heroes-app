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
  public prevSearches!: string[] | null;

  @Input() newSearch!: string;
  @Output() searchPrev = new EventEmitter<string>();

  constructor() {}

  public ngOnInit(): void {
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

  public searchValue(search: string) {
    this.searchPrev.emit(search);
  }
}
