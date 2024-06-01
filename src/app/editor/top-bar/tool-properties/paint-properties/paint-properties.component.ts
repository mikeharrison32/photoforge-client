import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { paintToolTypes } from './paintToolTypes';
import { ToolService } from 'src/app/core/services/tool.service';
import { BrushToolService } from 'src/app/core/services/brush-tool.service';

@Component({
  selector: 'app-brush-tool-properties',
  templateUrl: './paint-properties.component.html',
  styleUrls: ['./paint-properties.component.scss'],
})
export class PaintPropertiesComponent implements OnInit {
  activeTool: paintToolTypes = 'brush';
  @Input() display!: HTMLElement;
  constructor(
    private data: DataService,
    private renderer: Renderer2,
    private toolService: ToolService,
    private brushToolService: BrushToolService
  ) {}

  ngOnInit(): void {
    console.log('paintbrush', this.display);
    this.activeTool = this.data.tools.getValue().paintGroup.selectedTool;
    // this.toolService.register(this.brushToolService);
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
