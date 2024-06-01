import { OnDestroy, Component, OnInit, Renderer2 } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { TextToolService } from 'src/app/core/services/text-tool.service';
import { ToolService } from 'src/app/core/services/tool.service';
import { textTool } from 'src/app/core/tools';
import { TextToolProperties } from 'src/app/types/tool';

@Component({
  selector: 'app-text-tool-properties',
  templateUrl: './text-tool-properties.component.html',
  styleUrls: ['./text-tool-properties.component.scss'],
})
export class TextToolPropertiesComponent implements OnInit, OnDestroy {
  properties?: TextToolProperties;
  constructor(
    private data: DataService,
    private renderer: Renderer2,
    private toolService: ToolService,
    private textToolService: TextToolService
  ) {}
  ngOnInit(): void {
    this.toolService.register(this.textToolService);
  }
  addText() {
    this.textToolService.addText('Hello', this.renderer, this.data);
  }
  selectFontStyle(value: any) {}
  selectFontFamiliy(value: any) {}
  setTextSize(value: any) {}
  setTextColor(e: any) {
    textTool.properties.color = e.target.value;
  }
  ngOnDestroy(): void {}
}
