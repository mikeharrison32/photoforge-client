import { TestBed } from '@angular/core/testing';

import { LassoSelectService } from './lasso-select.service';

describe('LassoSelectService', () => {
  let service: LassoSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LassoSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
