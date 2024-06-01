import { AfterViewInit, Component } from '@angular/core';
import { PixelLayer } from 'src/app/core/layers/pixel-layer';
import { AdjustmentService } from 'src/app/core/services/adjustment.service';
import { DataService } from 'src/app/core/services/data.service';
import { LayerService } from 'src/app/core/services/layer.service';
import { cloneStampTool } from 'src/app/core/tools';
import { AdjustmentLayer } from 'src/app/types/layer';

@Component({
  selector: 'app-clone-stamp-tool-properties',
  templateUrl: './adjust-properties.component.html',
  styleUrls: ['./adjust-properties.component.scss'],
})
export class AdjustPropertiesComponent implements AfterViewInit {
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
