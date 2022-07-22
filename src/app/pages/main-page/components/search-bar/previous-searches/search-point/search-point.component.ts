import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-point',
  templateUrl: './search-point.component.html',
  styleUrls: ['./search-point.component.scss'],
})
export class SearchPointComponent {
  @Input() public search!: string;
  @Output() public searchPrev: EventEmitter<string> =
    new EventEmitter<string>();

  public searchValue(): void {
    this.searchPrev.emit(this.search);
  }
}
