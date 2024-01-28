import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectSelectToolPropertiesComponent } from './rect-select-tool-properties.component';

describe('RectSelectToolPropertiesComponent', () => {
  let component: RectSelectToolPropertiesComponent;
  let fixture: ComponentFixture<RectSelectToolPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RectSelectToolPropertiesComponent]
    });
    fixture = TestBed.createComponent(RectSelectToolPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
