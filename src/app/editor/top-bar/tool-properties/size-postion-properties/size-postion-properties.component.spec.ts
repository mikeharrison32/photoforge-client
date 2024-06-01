import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizePostionPropertiesComponent } from './size-postion-properties.component';

describe('MoveToolPropertiesComponent', () => {
  let component: SizePostionPropertiesComponent;
  let fixture: ComponentFixture<SizePostionPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SizePostionPropertiesComponent],
    });
    fixture = TestBed.createComponent(SizePostionPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
