import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropToolPropertiesComponent } from './crop-tool-properties.component';

describe('CropToolPropertiesComponent', () => {
  let component: CropToolPropertiesComponent;
  let fixture: ComponentFixture<CropToolPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CropToolPropertiesComponent]
    });
    fixture = TestBed.createComponent(CropToolPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
