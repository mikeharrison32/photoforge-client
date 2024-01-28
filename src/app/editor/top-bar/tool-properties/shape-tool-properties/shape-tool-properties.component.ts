import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { Shape } from 'src/app/enums/shapes';
import { ShapeToolProperties } from 'src/app/types/tool';
@Component({
  selector: 'app-shape-tool-properties',
  templateUrl: './shape-tool-properties.component.html',
  styleUrls: ['./shape-tool-properties.component.scss'],
})
export class ShapeToolPropertiesComponent implements OnInit, OnDestroy {
  shapeProps?: ShapeToolProperties;
  get Shape() {
    return Shape;
  }
  constructor(private data: DataService) {}
  ngOnInit(): void {}

  onFillColorChange(e: any) {}
  onStrokeChange(e: any) {}
  onRadiusChange(value: any) {}
  onStrokeWidthChange(value: any) {}
  ngOnDestroy(): void {}
}
