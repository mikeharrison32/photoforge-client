import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VibranceComponent } from './vibrance.component';

describe('VibranceComponent', () => {
  let component: VibranceComponent;
  let fixture: ComponentFixture<VibranceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VibranceComponent]
    });
    fixture = TestBed.createComponent(VibranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
