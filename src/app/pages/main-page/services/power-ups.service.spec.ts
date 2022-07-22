import { TestBed } from '@angular/core/testing';

import { PowerUpsService } from './power-ups.service';

describe('PowerUpsService', () => {
  let service: PowerUpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PowerUpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
