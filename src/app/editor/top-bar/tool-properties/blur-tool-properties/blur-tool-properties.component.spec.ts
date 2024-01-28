import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlurToolPropertiesComponent } from './blur-tool-properties.component';

describe('BlurToolPropertiesComponent', () => {
  let component: BlurToolPropertiesComponent;
  let fixture: ComponentFixture<BlurToolPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlurToolPropertiesComponent]
    });
    fixture = TestBed.createComponent(BlurToolPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
