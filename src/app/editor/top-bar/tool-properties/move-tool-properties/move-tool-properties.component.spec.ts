import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveToolPropertiesComponent } from './move-tool-properties.component';

describe('MoveToolPropertiesComponent', () => {
  let component: MoveToolPropertiesComponent;
  let fixture: ComponentFixture<MoveToolPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoveToolPropertiesComponent]
    });
    fixture = TestBed.createComponent(MoveToolPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
