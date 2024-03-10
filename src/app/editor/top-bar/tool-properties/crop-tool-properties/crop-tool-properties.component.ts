import { Component } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { cropTool } from 'src/app/core/tools';

@Component({
  selector: 'app-crop-tool-properties',
  templateUrl: './crop-tool-properties.component.html',
  styleUrls: ['./crop-tool-properties.component.scss'],
})
export class CropToolPropertiesComponent {
  constructor(private data: DataService) {}
  finishCropping() {
    console.log(cropTool.cropRect);
    const displayParent = this.data.displayElem.getValue()?.parentElement!;
    displayParent.style.width =
      cropTool.cropRect!.width - cropTool.cropRect!.x + 'px';
    displayParent.style.height =
      cropTool.cropRect!.height - cropTool.cropRect!.y + 'px';
  }
  revert() {}
}
