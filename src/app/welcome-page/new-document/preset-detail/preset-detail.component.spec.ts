import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetDetailComponent } from './preset-detail.component';

describe('PresetDetailComponent', () => {
  let component: PresetDetailComponent;
  let fixture: ComponentFixture<PresetDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresetDetailComponent]
    });
    fixture = TestBed.createComponent(PresetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
