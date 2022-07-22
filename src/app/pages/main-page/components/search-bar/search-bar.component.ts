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
  @Output() public submit = new EventEmitter<string>();

  public searchValue: string = '';
  public isValidSearch: boolean = false;
  public prevSearchValue: string = '';

  public searchHero(event?: KeyboardEvent): void {
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

<<<<<<< HEAD
  public searchByValue(search: string) {
=======
  public searchPrev(search: string): void {
>>>>>>> 3068a01 (US006: fixed codestyle)
    this.searchValue = search;
    this.submit.emit(this.searchValue);
  }
}
