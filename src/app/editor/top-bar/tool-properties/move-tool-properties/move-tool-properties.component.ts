import { Component, OnDestroy, OnInit } from '@angular/core';
import { Layer } from 'src/app/core/layers/layer';
import { DataService } from 'src/app/core/services/data.service';
import { sizePositionToolTypes } from './sizePositionToolTypes';
import { MoveToolService } from 'src/app/core/services/move-tool.service';
import { TransformService } from 'src/app/core/services/transform.service';

@Component({
  selector: 'app-move-tool-properties',
  templateUrl: './move-tool-properties.component.html',
  styleUrls: ['./move-tool-properties.component.scss'],
})
export class MoveToolPropertiesComponent implements OnInit, OnDestroy {
  canvas?: fabric.Canvas | null;
  selectedLayer?: Layer;
  activeTool: sizePositionToolTypes = 'move';
  constructor(
    private data: DataService,
    private moveToolService: MoveToolService,
    private transformService: TransformService
  ) {}
  ngOnInit(): void {
    this.activeTool = this.data.tools.getValue().sizePositionGroup.selectedTool;
  }
  setActive(tool: sizePositionToolTypes) {
    this.activeTool = tool;
    this.data.tools.getValue().sizePositionGroup.selectedTool = tool;
    switch (tool) {
      case 'transform':
        this.selectedLayer = this.data.selectedLayers.getValue()[0];
        break;
    }
  }
  ngOnDestroy(): void {
    // this.data.selectedLayers.unsubscribe();
  }
  centerSelectedObjVertical() {
    this.moveToolService.centerSelectedObjVertical();
  }
  centerSelectedObjHorizontal() {
    this.moveToolService.centerSelectedObjHorizontal();
  }
  alignTop() {
    this.moveToolService.alignTop();
  }
  alignLeft() {
    this.moveToolService.alignLeft();
  }
  alignRight() {
    this.moveToolService.alignRight();
  }
  alignBottom() {
    this.moveToolService.alignBottom();
  }
}
