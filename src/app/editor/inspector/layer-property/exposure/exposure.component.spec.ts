import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExposureComponent } from './exposure.component';

describe('ExposureComponent', () => {
  let component: ExposureComponent;
  let fixture: ComponentFixture<ExposureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExposureComponent]
    });
    fixture = TestBed.createComponent(ExposureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
