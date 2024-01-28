import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerPropertyComponent } from './layer-property.component';

describe('LayerPropertyComponent', () => {
  let component: LayerPropertyComponent;
  let fixture: ComponentFixture<LayerPropertyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayerPropertyComponent]
    });
    fixture = TestBed.createComponent(LayerPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
