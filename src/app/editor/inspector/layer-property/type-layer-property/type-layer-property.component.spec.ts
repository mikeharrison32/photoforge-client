import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeLayerPropertyComponent } from './type-layer-property.component';

describe('TypeLayerPropertyComponent', () => {
  let component: TypeLayerPropertyComponent;
  let fixture: ComponentFixture<TypeLayerPropertyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeLayerPropertyComponent]
    });
    fixture = TestBed.createComponent(TypeLayerPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
