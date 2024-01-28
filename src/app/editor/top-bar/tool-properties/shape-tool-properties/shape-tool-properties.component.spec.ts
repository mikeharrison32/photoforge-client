import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeToolPropertiesComponent } from './shape-tool-properties.component';

describe('ShapeToolPropertiesComponent', () => {
  let component: ShapeToolPropertiesComponent;
  let fixture: ComponentFixture<ShapeToolPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShapeToolPropertiesComponent]
    });
    fixture = TestBed.createComponent(ShapeToolPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
