import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorBalanceComponent } from './color-balance.component';

describe('ColorBalanceComponent', () => {
  let component: ColorBalanceComponent;
  let fixture: ComponentFixture<ColorBalanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorBalanceComponent]
    });
    fixture = TestBed.createComponent(ColorBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
