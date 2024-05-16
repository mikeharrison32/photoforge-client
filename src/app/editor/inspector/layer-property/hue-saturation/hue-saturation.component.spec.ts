import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HueSaturationComponent } from './hue-saturation.component';

describe('HueSaturationComponent', () => {
  let component: HueSaturationComponent;
  let fixture: ComponentFixture<HueSaturationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HueSaturationComponent]
    });
    fixture = TestBed.createComponent(HueSaturationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
