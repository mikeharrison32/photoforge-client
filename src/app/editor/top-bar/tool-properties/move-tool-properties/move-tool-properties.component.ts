import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-move-tool-properties',
  templateUrl: './move-tool-properties.component.html',
  styleUrls: ['./move-tool-properties.component.scss'],
})
export class MoveToolPropertiesComponent implements OnInit {
  canvas?: fabric.Canvas | null;
  constructor(private data: DataService) {}
  ngOnInit(): void {
    this.data.canvas.subscribe((canvas) => {
      this.canvas = canvas;
    });
  }
  centerSelectedObjVertical() {
    this.canvas?.getActiveObjects().forEach((obj) => {
      this.canvas?.centerObjectV(obj);
    });
  }
  centerSelectedObjHorizontal() {
    this.canvas?.getActiveObjects().forEach((obj) => {
      this.canvas?.centerObjectH(obj);
    });
  }
  alignTop() {
    this.canvas?.getActiveObjects().forEach((obj) => {
      obj.top = 0;
      this.canvas?.requestRenderAll();
    });
  }
  alignLeft() {
    this.canvas?.getActiveObjects().forEach((obj) => {
      obj.left = 0;
      this.canvas?.requestRenderAll();
    });
  }
  alignRight() {
    this.canvas?.getActiveObjects().forEach((obj) => {
      obj.left = 267;
      this.canvas?.requestRenderAll();
    });
  }
  alignBottom() {
    this.canvas?.getActiveObjects().forEach((obj) => {
      obj.top = this.canvas!.width! - obj.width!;
      this.canvas?.requestRenderAll();
    });
  }
}
