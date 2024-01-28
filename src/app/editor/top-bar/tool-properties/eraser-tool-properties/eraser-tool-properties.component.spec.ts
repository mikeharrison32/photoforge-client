import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EraserToolPropertiesComponent } from './eraser-tool-properties.component';

describe('EraserToolPropertiesComponent', () => {
  let component: EraserToolPropertiesComponent;
  let fixture: ComponentFixture<EraserToolPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EraserToolPropertiesComponent]
    });
    fixture = TestBed.createComponent(EraserToolPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
