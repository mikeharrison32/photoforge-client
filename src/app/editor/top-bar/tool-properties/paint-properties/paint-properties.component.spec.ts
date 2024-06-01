import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintPropertiesComponent } from './paint-properties.component';

describe('PaintPropertiesComponent', () => {
  let component: PaintPropertiesComponent;
  let fixture: ComponentFixture<PaintPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaintPropertiesComponent],
    });
    fixture = TestBed.createComponent(PaintPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
