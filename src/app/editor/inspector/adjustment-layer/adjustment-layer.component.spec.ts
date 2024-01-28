import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustmentLayerComponent } from './adjustment-layer.component';

describe('AdjustmentLayerComponent', () => {
  let component: AdjustmentLayerComponent;
  let fixture: ComponentFixture<AdjustmentLayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdjustmentLayerComponent]
    });
    fixture = TestBed.createComponent(AdjustmentLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
