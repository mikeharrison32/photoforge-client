import {
  AfterViewInit,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { AdjustmentLayer } from 'src/app/core/layers/adjustment/adjustment_layer';
import { BrightnessContrastAdjustmentLayer } from 'src/app/core/layers/adjustment/brightness_contrast';
import { DataService } from 'src/app/core/services/data.service';
@Component({
  selector: 'app-layer-property',
  templateUrl: './layer-property.component.html',
  styleUrls: ['./layer-property.component.scss'],
})
export class LayerPropertyComponent implements OnInit, OnDestroy {
  selectedLayer?: any;
  selectedAdjustmentLayer?: any;

  constructor(private data: DataService, private ngZone: NgZone) {}
  ngOnInit() {
    this.data.selectedLayers.subscribe((sl_layers) => {
      this.selectedLayer = sl_layers[0];
    });
    this.data.selectedAjLayers.subscribe((aj_layers) => {
      this.selectedAdjustmentLayer = aj_layers[0];
    });
  }
  onXChange(x: any) {
    this.selectedLayer.canvas.style.left = x + 'px';
  }
  onBrightnessChange(value: any) {
    if (
      this.selectedAdjustmentLayer instanceof BrightnessContrastAdjustmentLayer
    ) {
      this.selectedAdjustmentLayer.set(
        {
          brightness: value,
          contrast: this.selectedAdjustmentLayer.contrast,
        },
        this.ngZone
      );
    }
  }
  onContrastChange(value: any) {
    if (
      this.selectedAdjustmentLayer instanceof BrightnessContrastAdjustmentLayer
    ) {
      this.selectedAdjustmentLayer.set(
        {
          brightness: this.selectedAdjustmentLayer.brightness,
          contrast: value,
        },
        this.ngZone
      );
    }
  }
  onHueChange(value: any) {}
  onSaturationChange(value: any) {}
  onLightnessChange(value: any) {}
  onYChange(y: any) {
    this.selectedLayer.canvas.style.top = y + 'px';
  }
  onWidthChange(width: any) {
    this.selectedLayer.canvas.style.width = width + 'px';
  }
  onHeightChange(height: any) {
    this.selectedLayer.canvas.style.height = height + 'px';
  }
  onLineHeightChange($event: string) {
    throw new Error('Method not implemented.');
  }
  onSelectedTypeLayerFontFamilyChange($event: string) {
    throw new Error('Method not implemented.');
  }
  onTextSizeChange(size: string) {}
  setTextAlignment(align: string) {}
  onFillChange(e: any) {}
  onStrokeChange(e: any) {}
  onStrokeWidthChange(width: string) {}
  ngOnDestroy(): void {
    this.data.selectedAjLayers.unsubscribe();
    this.data.selectedLayers.unsubscribe();
  }
}
