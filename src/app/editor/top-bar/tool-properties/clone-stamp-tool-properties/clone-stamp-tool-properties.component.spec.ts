import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloneStampToolPropertiesComponent } from './clone-stamp-tool-properties.component';

describe('CloneStampToolPropertiesComponent', () => {
  let component: CloneStampToolPropertiesComponent;
  let fixture: ComponentFixture<CloneStampToolPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CloneStampToolPropertiesComponent]
    });
    fixture = TestBed.createComponent(CloneStampToolPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
