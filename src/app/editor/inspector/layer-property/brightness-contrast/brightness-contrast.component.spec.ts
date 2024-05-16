import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrightnessContrastComponent } from './brightness-contrast.component';

describe('BrightnessContrastComponent', () => {
  let component: BrightnessContrastComponent;
  let fixture: ComponentFixture<BrightnessContrastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrightnessContrastComponent]
    });
    fixture = TestBed.createComponent(BrightnessContrastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
