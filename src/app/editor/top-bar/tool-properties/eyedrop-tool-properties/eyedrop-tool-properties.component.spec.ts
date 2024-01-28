import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EyedropToolPropertiesComponent } from './eyedrop-tool-properties.component';

describe('EyedropToolPropertiesComponent', () => {
  let component: EyedropToolPropertiesComponent;
  let fixture: ComponentFixture<EyedropToolPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EyedropToolPropertiesComponent]
    });
    fixture = TestBed.createComponent(EyedropToolPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
