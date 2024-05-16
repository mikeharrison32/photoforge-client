import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeLayerPropertyComponent } from './shape-layer-property.component';

describe('ShapeLayerPropertyComponent', () => {
  let component: ShapeLayerPropertyComponent;
  let fixture: ComponentFixture<ShapeLayerPropertyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShapeLayerPropertyComponent]
    });
    fixture = TestBed.createComponent(ShapeLayerPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
