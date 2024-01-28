import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenToolPropertiesComponent } from './pen-tool-properties.component';

describe('PenToolPropertiesComponent', () => {
  let component: PenToolPropertiesComponent;
  let fixture: ComponentFixture<PenToolPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PenToolPropertiesComponent]
    });
    fixture = TestBed.createComponent(PenToolPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
