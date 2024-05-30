import { Component, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Layer } from 'src/app/core/layers/layer';
import { DataService } from 'src/app/core/services/data.service';
import { sizePositionToolTypes } from './sizePositionToolTypes';
import { MoveToolService } from 'src/app/core/services/move-tool.service';
import { TransformService } from 'src/app/core/services/transform.service';
import { ToolService } from 'src/app/core/services/tool.service';
import { CropToolService } from 'src/app/core/services/crop-tool.service';

@Component({
  selector: 'app-move-tool-properties',
  templateUrl: './move-tool-properties.component.html',
  styleUrls: ['./move-tool-properties.component.scss'],
})
export class MoveToolPropertiesComponent implements OnInit, OnDestroy {
  selectedLayer?: Layer;
  activeTool: sizePositionToolTypes = 'move';
  @Input() display!: HTMLElement;
  constructor(
    private data: DataService,
    private moveToolService: MoveToolService,
    private transformService: TransformService,
    private toolService: ToolService,
    private renderer: Renderer2,
    private cropToolService: CropToolService
  ) {}
  ngOnInit(): void {
    this.toolService.register(this.moveToolService);
    this.toolService.register(this.transformService);
    this.toolService.register(this.cropToolService);

    this.activeTool = this.data.tools.getValue().sizePositionGroup.selectedTool;
  }
  setActive(tool: sizePositionToolTypes) {
    this.activeTool = tool;
    this.data.tools.getValue().sizePositionGroup.selectedTool = tool;
    this.toolService.disconfigureTools();
    switch (tool) {
      case 'move':
        this.moveToolService.configure(this.display, this.renderer);
        break;
      case 'transform':
        this.selectedLayer = this.data.selectedLayers.getValue()[0];
        break;
      case 'crop':
        this.cropToolService.configure();
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
