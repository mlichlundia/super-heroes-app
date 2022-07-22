import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPointComponent } from './search-point.component';

describe('SearchPointComponent', () => {
  let component: SearchPointComponent;
  let fixture: ComponentFixture<SearchPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
