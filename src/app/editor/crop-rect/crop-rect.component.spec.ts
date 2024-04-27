import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropRectComponent } from './crop-rect.component';

describe('CropRectComponent', () => {
  let component: CropRectComponent;
  let fixture: ComponentFixture<CropRectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CropRectComponent]
    });
    fixture = TestBed.createComponent(CropRectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
