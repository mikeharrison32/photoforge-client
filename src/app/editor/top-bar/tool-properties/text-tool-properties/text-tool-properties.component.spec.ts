import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextToolPropertiesComponent } from './text-tool-properties.component';

describe('TextToolPropertiesComponent', () => {
  let component: TextToolPropertiesComponent;
  let fixture: ComponentFixture<TextToolPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextToolPropertiesComponent]
    });
    fixture = TestBed.createComponent(TextToolPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
