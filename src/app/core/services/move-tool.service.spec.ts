import { TestBed } from '@angular/core/testing';

import { MoveToolService } from './move-tool.service';

describe('MoveToolService', () => {
  let service: MoveToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoveToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
