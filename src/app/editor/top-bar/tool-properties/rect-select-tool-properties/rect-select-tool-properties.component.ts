import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { selectionToolType } from './selectionToolType';
import { RectSelectService } from 'src/app/core/services/rect-select.service';
import { LassoSelectService } from 'src/app/core/services/lasso-select.service';

@Component({
  selector: 'app-rect-select-tool-properties',
  templateUrl: './rect-select-tool-properties.component.html',
  styleUrls: ['./rect-select-tool-properties.component.scss'],
})
export class RectSelectToolPropertiesComponent implements OnInit {
  selectedSelectionOption: 'normal' | 'add' | 'subtract' | 'intersect' =
    'normal';
  activeTool: selectionToolType = 'rect';

  constructor(
    private data: DataService,
    private rectSelectToolService: RectSelectService,
    private lassoSelectToolService: LassoSelectService
  ) {}
  ngOnInit(): void {
    this.activeTool = this.data.tools.getValue().selectGroup.selectedTool;
  }
  setSelectionOption(option: 'normal' | 'add' | 'subtract' | 'intersect') {
    this.selectedSelectionOption = option;
  }

  setActiveTool(tool: selectionToolType) {
    this.activeTool = tool;
    this.data.tools.getValue().selectGroup.selectedTool = tool;
    switch (tool) {
      case 'rect':
        this.rectSelectToolService.configure();
        break;
      case 'lasso':
        this.lassoSelectToolService.configure();
        break;
    }
  }
}
