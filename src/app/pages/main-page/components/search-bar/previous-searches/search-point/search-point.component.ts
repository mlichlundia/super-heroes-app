import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-point',
  templateUrl: './search-point.component.html',
  styleUrls: ['./search-point.component.scss'],
})
export class SearchPointComponent {
  @Input() search!: string;
  @Output() searchPrev = new EventEmitter<string>();

  constructor() {}

  public searchValue() {
    this.searchPrev.emit(this.search);
  }
}
