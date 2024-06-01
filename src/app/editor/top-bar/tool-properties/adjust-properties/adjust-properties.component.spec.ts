import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustPropertiesComponent } from './adjust-properties.component';

describe('AdjustPropertiesComponent', () => {
  let component: AdjustPropertiesComponent;
  let fixture: ComponentFixture<AdjustPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdjustPropertiesComponent],
    });
    fixture = TestBed.createComponent(AdjustPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
