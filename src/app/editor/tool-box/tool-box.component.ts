import { Component, OnDestroy, OnInit } from '@angular/core';
import { Tool } from '../../enums/tool.enum';
import { DataService } from '../../core/services/data.service';
import { Layer } from 'src/app/types/layer';
import { Shape } from 'src/app/enums/shapes';
import { shapeTool } from 'src/app/core/tools';

@Component({
  selector: 'app-tool-box',
  templateUrl: './tool-box.component.html',
  styleUrls: ['./tool-box.component.scss'],
})
export class ToolBoxComponent implements OnInit, OnDestroy {
  shapeImgSrc: string =
    'assets/tools-icons/shape-tools-icons/rectangle-shape-tool.svg';
  forgroundColor: string = '#fff';
  backgroundColor: string = '#000';
  fgColorPickerActive: boolean = false;
  bgColorPickerActive: boolean = false;
  constructor(private data: DataService) {}
  selectedToolGroup?: string;
  tools: any;
  get Shape() {
    return Shape;
  }

  setSelectedToolGroup(groupName: string) {
    this.data.selectedToolGroup.next(groupName);
  }
  setSelectedShape(shape: Shape) {
    switch (shape) {
      case Shape.Rectangle:
        this.shapeImgSrc =
          'assets/tools-icons/shape-tools-icons/rectangle-shape-tool.svg';
        shapeTool.shape = Shape.Rectangle;
        break;
      case Shape.RoundedRectangle:
        this.shapeImgSrc =
          'assets/tools-icons/shape-tools-icons/rounded-rectangle-shape-tool.svg';
        shapeTool.shape = Shape.RoundedRectangle;

        break;
      case Shape.Ellipse:
        this.shapeImgSrc =
          'assets/tools-icons/shape-tools-icons/ellipse-shape-tool.svg';
        shapeTool.shape = Shape.Ellipse;

        break;
      case Shape.Polygon:
        this.shapeImgSrc =
          'assets/tools-icons/shape-tools-icons/polygon-shape-tool.svg';
        shapeTool.shape = Shape.Polygon;

        break;
      case Shape.Line:
        this.shapeImgSrc =
          'assets/tools-icons/shape-tools-icons/line-shape-tool.svg';
        shapeTool.shape = Shape.Line;

        break;
      case Shape.CustomShape:
        this.shapeImgSrc =
          'assets/tools-icons/shape-tools-icons/custom-shape-tool.svg';
        break;
    }
  }
  ngOnInit() {
    this.data.selectedToolGroup.subscribe(
      (tool) => (this.selectedToolGroup = tool)
    );
    this.data.tools.subscribe((tools) => {
      this.tools = tools;
    });
  }
  restoreColors() {
    this.forgroundColor = '#fff';
    this.backgroundColor = '#000';
    this.data.selectedColors.next({
      fg: this.forgroundColor,
      bg: this.backgroundColor,
    });
  }
  shiftColors() {
    const bgColor = this.backgroundColor;
    const fgColor = this.forgroundColor;
    this.forgroundColor = bgColor;
    this.backgroundColor = fgColor;
    this.data.selectedColors.next({
      fg: this.forgroundColor,
      bg: this.backgroundColor,
    });
  }
  setFgColor(e: string) {
    this.forgroundColor = e;
    this.data.selectedColors.next({
      fg: this.forgroundColor,
      bg: this.backgroundColor,
    });
  }
  setBgColor(e: string) {
    this.backgroundColor = e;
    this.data.selectedColors.next({
      fg: this.forgroundColor,
      bg: this.backgroundColor,
    });
  }
  ngOnDestroy() {}
}
