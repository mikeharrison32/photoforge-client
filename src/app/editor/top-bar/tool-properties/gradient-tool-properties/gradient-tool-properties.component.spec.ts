import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientToolPropertiesComponent } from './gradient-tool-properties.component';

describe('GradientToolPropertiesComponent', () => {
  let component: GradientToolPropertiesComponent;
  let fixture: ComponentFixture<GradientToolPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GradientToolPropertiesComponent]
    });
    fixture = TestBed.createComponent(GradientToolPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
