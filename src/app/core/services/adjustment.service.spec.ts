import { TestBed } from '@angular/core/testing';

import { AdjustmentService } from './adjustment.service';

describe('AdjustmentService', () => {
  let service: AdjustmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdjustmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
