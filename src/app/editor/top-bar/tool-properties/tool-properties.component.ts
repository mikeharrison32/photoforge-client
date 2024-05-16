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
  tools: any;
  constructor(private data: DataService) {}
  selectedToolGroup?: string;
  ngOnInit() {
    this.data.selectedToolGroup.subscribe(
      (tool) => (this.selectedToolGroup = tool)
    );
    this.data.tools.subscribe((tools) => {
      this.tools = tools;
    });
  }
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}
}
