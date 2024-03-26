import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelLayerPropertyComponent } from './pixel-layer-property.component';

describe('PixelLayerPropertyComponent', () => {
  let component: PixelLayerPropertyComponent;
  let fixture: ComponentFixture<PixelLayerPropertyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PixelLayerPropertyComponent]
    });
    fixture = TestBed.createComponent(PixelLayerPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
