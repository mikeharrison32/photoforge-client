import { TestBed } from '@angular/core/testing';

import { CropToolService } from './crop-tool.service';

describe('CropToolService', () => {
  let service: CropToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CropToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
