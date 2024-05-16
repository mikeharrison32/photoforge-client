import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { paintToolTypes } from './paintToolTypes';

@Component({
  selector: 'app-brush-tool-properties',
  templateUrl: './brush-tool-properties.component.html',
  styleUrls: ['./brush-tool-properties.component.scss'],
})
export class BrushToolPropertiesComponent implements OnInit {
  activeTool: paintToolTypes = 'brush';
  constructor(private data: DataService) {}
  onBrushSizeChange(size: number) {}
  setActiveTool(toolName: paintToolTypes) {
    this.activeTool = toolName;
    this.data.tools.getValue().paintGroup.selectedTool = toolName;
  }
  ngOnInit(): void {
    this.activeTool = this.data.tools.getValue().paintGroup.selectedTool;
  }
}
