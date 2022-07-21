import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  public searchValue = '';
  public isValidSearch = false;
  public prevSearchValue = '';

  @Output() submit = new EventEmitter<string>();

  constructor() {}

  public searchHero(event?: KeyboardEvent) {
    this.isValidSearch =
      this.searchValue.length === this.searchValue.trim().length &&
      !!this.searchValue.length;

    if (!this.isValidSearch) {
      return;
    }

    if (event && event?.key !== 'Enter') {
      return;
    }

    this.prevSearchValue = this.searchValue;
    this.submit.emit(this.searchValue);
  }

  public searchByValue(search: string) {
    this.searchValue = search;
    this.submit.emit(this.searchValue);
  }
}
