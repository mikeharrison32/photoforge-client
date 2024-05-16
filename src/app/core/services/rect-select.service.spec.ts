import { TestBed } from '@angular/core/testing';

import { RectSelectService } from './rect-select.service';

describe('RectSelectService', () => {
  let service: RectSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RectSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
