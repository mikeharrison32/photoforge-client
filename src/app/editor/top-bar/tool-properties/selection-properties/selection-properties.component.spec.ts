import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionPropertiesComponent } from './selection-properties.component';

describe('SelectionPropertiesComponent', () => {
  let component: SelectionPropertiesComponent;
  let fixture: ComponentFixture<SelectionPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectionPropertiesComponent],
    });
    fixture = TestBed.createComponent(SelectionPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
