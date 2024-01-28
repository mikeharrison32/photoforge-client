import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandToolPropertiesComponent } from './hand-tool-properties.component';

describe('HandToolPropertiesComponent', () => {
  let component: HandToolPropertiesComponent;
  let fixture: ComponentFixture<HandToolPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HandToolPropertiesComponent]
    });
    fixture = TestBed.createComponent(HandToolPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
