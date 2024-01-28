import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSelectToolPropertiesComponent } from './quick-select-tool-properties.component';

describe('QuickSelectToolPropertiesComponent', () => {
  let component: QuickSelectToolPropertiesComponent;
  let fixture: ComponentFixture<QuickSelectToolPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuickSelectToolPropertiesComponent]
    });
    fixture = TestBed.createComponent(QuickSelectToolPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
