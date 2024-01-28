import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodgeToolPropertiesComponent } from './dodge-tool-properties.component';

describe('DodgeToolPropertiesComponent', () => {
  let component: DodgeToolPropertiesComponent;
  let fixture: ComponentFixture<DodgeToolPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DodgeToolPropertiesComponent]
    });
    fixture = TestBed.createComponent(DodgeToolPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
