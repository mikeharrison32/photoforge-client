import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { shapeTool } from 'src/app/core/tools';
import { Shape } from 'src/app/enums/shapes';
import { ShapeToolProperties } from 'src/app/types/tool';
@Component({
  selector: 'app-shape-tool-properties',
  templateUrl: './shape-tool-properties.component.html',
  styleUrls: ['./shape-tool-properties.component.scss'],
})
export class ShapeToolPropertiesComponent implements OnInit, OnDestroy {
  shapeProps?: ShapeToolProperties;
  activeTool: 'rect' | 'ellipse' | 'line' | 'polygon' | 'triangle' = 'rect';
  get Shape() {
    return Shape;
  }
  constructor(private data: DataService) {}
  ngOnInit(): void {}

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
