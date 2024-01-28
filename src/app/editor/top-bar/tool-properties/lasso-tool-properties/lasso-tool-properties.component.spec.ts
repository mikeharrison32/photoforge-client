import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LassoToolPropertiesComponent } from './lasso-tool-properties.component';

describe('LassoToolPropertiesComponent', () => {
  let component: LassoToolPropertiesComponent;
  let fixture: ComponentFixture<LassoToolPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LassoToolPropertiesComponent]
    });
    fixture = TestBed.createComponent(LassoToolPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
