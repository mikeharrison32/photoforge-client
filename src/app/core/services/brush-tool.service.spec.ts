import { TestBed } from '@angular/core/testing';

import { BrushToolService } from './brush-tool.service';

describe('BrushToolService', () => {
  let service: BrushToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrushToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
