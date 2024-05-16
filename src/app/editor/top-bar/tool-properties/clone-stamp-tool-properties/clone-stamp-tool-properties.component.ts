import { AfterViewInit, Component } from '@angular/core';
import { PixelLayer } from 'src/app/core/layers/pixel-layer';
import { AdjustmentService } from 'src/app/core/services/adjustment.service';
import { DataService } from 'src/app/core/services/data.service';
import { LayerService } from 'src/app/core/services/layer.service';
import { cloneStampTool } from 'src/app/core/tools';
import { AdjustmentLayer } from 'src/app/types/layer';

@Component({
  selector: 'app-clone-stamp-tool-properties',
  templateUrl: './clone-stamp-tool-properties.component.html',
  styleUrls: ['./clone-stamp-tool-properties.component.scss'],
})
export class CloneStampToolPropertiesComponent implements AfterViewInit {
  constructor(
    private adjustmentService: AdjustmentService,
    private data: DataService
  ) {}
  ngAfterViewInit(): void {}

  get Adjustment() {
    return AdjustmentLayer;
  }
  onBrushSizeChange(size: number) {
    cloneStampTool.firstBrush?.setSize(size);
  }

  addAdjustment(ad_type: AdjustmentLayer) {
    this.data.selectedLayers.getValue().forEach((layer) => {
      if (layer instanceof PixelLayer) {
        this.adjustmentService.addAdjustmentLayer(ad_type, layer);
      }
    });
  }
}
