import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryBrushToolPropertiesComponent } from './history-brush-tool-properties.component';

describe('HistoryBrushToolPropertiesComponent', () => {
  let component: HistoryBrushToolPropertiesComponent;
  let fixture: ComponentFixture<HistoryBrushToolPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryBrushToolPropertiesComponent]
    });
    fixture = TestBed.createComponent(HistoryBrushToolPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
