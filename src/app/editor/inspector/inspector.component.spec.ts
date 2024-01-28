import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorComponent } from './inspector.component';

describe('InspectorComponent', () => {
  let component: InspectorComponent;
  let fixture: ComponentFixture<InspectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InspectorComponent]
    });
    fixture = TestBed.createComponent(InspectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
