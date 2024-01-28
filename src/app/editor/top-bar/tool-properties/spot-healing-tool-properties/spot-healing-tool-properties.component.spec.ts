import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotHealingToolPropertiesComponent } from './spot-healing-tool-properties.component';

describe('SpotHealingToolPropertiesComponent', () => {
  let component: SpotHealingToolPropertiesComponent;
  let fixture: ComponentFixture<SpotHealingToolPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpotHealingToolPropertiesComponent]
    });
    fixture = TestBed.createComponent(SpotHealingToolPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
