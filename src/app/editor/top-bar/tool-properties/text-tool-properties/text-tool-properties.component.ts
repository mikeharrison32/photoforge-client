import { OnDestroy, Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { textTool } from 'src/app/core/tools';
import { TextToolProperties } from 'src/app/types/tool';

@Component({
  selector: 'app-text-tool-properties',
  templateUrl: './text-tool-properties.component.html',
  styleUrls: ['./text-tool-properties.component.scss'],
})
export class TextToolPropertiesComponent implements OnInit, OnDestroy {
  properties?: TextToolProperties;
  constructor(private data: DataService) {}
  ngOnInit(): void {}
  selectFontStyle(value: any) {}
  selectFontFamiliy(value: any) {}
  setTextSize(value: any) {}
  setTextColor(e: any) {
    textTool.properties.color = e.target.value;
  }
  ngOnDestroy(): void {}
}
