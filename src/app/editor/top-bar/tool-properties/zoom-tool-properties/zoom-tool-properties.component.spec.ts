import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomToolPropertiesComponent } from './zoom-tool-properties.component';

describe('ZoomToolPropertiesComponent', () => {
  let component: ZoomToolPropertiesComponent;
  let fixture: ComponentFixture<ZoomToolPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZoomToolPropertiesComponent]
    });
    fixture = TestBed.createComponent(ZoomToolPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
