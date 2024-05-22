import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { paintToolTypes } from './paintToolTypes';
import { ToolService } from 'src/app/core/services/tool.service';
import { BrushToolService } from 'src/app/core/services/brush-tool.service';

@Component({
  selector: 'app-brush-tool-properties',
  templateUrl: './brush-tool-properties.component.html',
  styleUrls: ['./brush-tool-properties.component.scss'],
})
export class BrushToolPropertiesComponent implements OnInit {
  activeTool: paintToolTypes = 'brush';
  @Input() display!: HTMLElement;
  constructor(
    private data: DataService,
    private renderer: Renderer2,
    private toolService: ToolService,
    private brushToolService: BrushToolService
  ) {}

  ngOnInit(): void {
    this.activeTool = this.data.tools.getValue().paintGroup.selectedTool;
    this.toolService.register(this.brushToolService);
  }
  onBrushSizeChange(size: number) {}
  setActiveTool(toolName: paintToolTypes) {
    this.toolService.disconfigureTools();
    this.activeTool = toolName;
    this.data.tools.getValue().paintGroup.selectedTool = toolName;
    switch (toolName) {
      case 'brush':
        this.brushToolService.configure(this.display, this.renderer);
        break;
    }
  }
}
