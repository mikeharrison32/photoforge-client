import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { ShapeToolService } from 'src/app/core/services/shape-tool.service';
import { shapeTool } from 'src/app/core/tools';
import { Shape } from 'src/app/enums/shapes';
import { ShapeToolProperties } from 'src/app/types/tool';
import { shapeToolTypes } from './shapeToolTypes';
@Component({
  selector: 'app-shape-tool-properties',
  templateUrl: './shape-tool-properties.component.html',
  styleUrls: ['./shape-tool-properties.component.scss'],
})
export class ShapeToolPropertiesComponent implements OnInit, OnDestroy {
  shapeProps?: ShapeToolProperties;
  activeTool: shapeToolTypes = 'rect';

  constructor(
    private data: DataService,
    private shapeToolService: ShapeToolService
  ) {}
  ngOnInit(): void {
    this.activeTool = this.data.tools.getValue().shapeGroup.selectedTool;
  }
  setActiveTool(tool: shapeToolTypes) {
    this.activeTool = tool;
    this.data.tools.getValue().shapeGroup.selectedTool = tool;
    this.shapeToolService.configure(tool);
  }

  onFillColorChange(e: any) {
    shapeTool.properties.fill = e.target.value;
  }
  onStrokeChange(e: any) {
    shapeTool.properties.stroke = e.target.value;
  }
  onRadiusChange(value: any) {}
  onStrokeWidthChange(value: any) {
    shapeTool.properties.strokeWidth = value;
  }
  ngOnDestroy(): void {}
}
