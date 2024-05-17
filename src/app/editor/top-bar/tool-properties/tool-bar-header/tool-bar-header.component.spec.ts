import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolBarHeaderComponent } from './tool-bar-header.component';

describe('ToolBarHeaderComponent', () => {
  let component: ToolBarHeaderComponent;
  let fixture: ComponentFixture<ToolBarHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolBarHeaderComponent]
    });
    fixture = TestBed.createComponent(ToolBarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
