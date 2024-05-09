import { Component } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-brush-tool-properties',
  templateUrl: './brush-tool-properties.component.html',
  styleUrls: ['./brush-tool-properties.component.scss'],
})
export class BrushToolPropertiesComponent {
  activeTool: 'brush' | 'eraser' | 'gradient' = 'brush';
  constructor(private data: DataService) {}
  onBrushSizeChange(size: number) {}
}
