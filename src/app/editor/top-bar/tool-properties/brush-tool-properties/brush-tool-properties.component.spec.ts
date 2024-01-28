import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrushToolPropertiesComponent } from './brush-tool-properties.component';

describe('BrushToolPropertiesComponent', () => {
  let component: BrushToolPropertiesComponent;
  let fixture: ComponentFixture<BrushToolPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrushToolPropertiesComponent]
    });
    fixture = TestBed.createComponent(BrushToolPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
