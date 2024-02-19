import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-tool-properties',
  templateUrl: './tool-properties.component.html',
  styleUrls: ['./tool-properties.component.scss'],
})
export class ToolPropertiesComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  constructor(private data: DataService) {}
  selectedTool?: string;
  ngOnInit() {
    this.data.selectedTool.subscribe((tool) => (this.selectedTool = tool));
  }
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {
    this.data.selectedTool.unsubscribe();
    // this.data.selectedLayers.unsubscribe();
    this.data.canvas.unsubscribe();
  }
}
