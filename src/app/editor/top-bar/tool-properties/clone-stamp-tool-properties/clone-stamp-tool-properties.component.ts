import { AfterViewInit, Component } from '@angular/core';
import { cloneStampTool } from 'src/app/core/tools';

@Component({
  selector: 'app-clone-stamp-tool-properties',
  templateUrl: './clone-stamp-tool-properties.component.html',
  styleUrls: ['./clone-stamp-tool-properties.component.scss'],
})
export class CloneStampToolPropertiesComponent implements AfterViewInit {
  ngAfterViewInit(): void {}
  onBrushSizeChange(size: number) {
    cloneStampTool.firstBrush?.setSize(size);
  }
}
