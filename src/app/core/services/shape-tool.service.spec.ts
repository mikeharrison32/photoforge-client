import { TestBed } from '@angular/core/testing';

import { ShapeToolService } from './shape-tool.service';

describe('ShapeToolService', () => {
  let service: ShapeToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShapeToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
