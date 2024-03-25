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
import { Exposure } from 'src/app/core/layers/adjustment/exposure';
import { HueSaturationLightnees } from 'src/app/core/layers/adjustment/hue_saturation_lightnees';
import { Vibrance } from 'src/app/core/layers/adjustment/vibrance';
import { PixelLayer } from 'src/app/core/layers/pixel-layer';
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
    this.selectedLayer.elem.style.left = x + 'px';
  }
  onExposureChange(value: any) {
    if (this.selectedAdjustmentLayer instanceof Exposure) {
      this.selectedAdjustmentLayer.set(
        {
          exposure: value,
          offset: this.selectedAdjustmentLayer.offset,
          gammaCorrection: this.selectedAdjustmentLayer.gammaCorrection,
        },
        this.ngZone
      );
    }
  }
  onExposureOffsetChange(value: any) {
    if (this.selectedAdjustmentLayer instanceof Exposure) {
      this.selectedAdjustmentLayer.set(
        {
          offset: value,
          exposure: this.selectedAdjustmentLayer.exposure,
          gammaCorrection: this.selectedAdjustmentLayer.gammaCorrection,
        },
        this.ngZone
      );
    }
  }
  onExposureGammaCorrectionChange(value: any) {
    if (this.selectedAdjustmentLayer instanceof Exposure) {
      this.selectedAdjustmentLayer.set(
        {
          gammaCorrection: value,
          exposure: this.selectedAdjustmentLayer.exposure,
          offset: this.selectedAdjustmentLayer.offset,
        },
        this.ngZone
      );
    }
  }
  onBrightnessChange(value: any) {
    if (
      this.selectedAdjustmentLayer instanceof BrightnessContrastAdjustmentLayer
    ) {
      this.ngZone.runOutsideAngular(() => {
        this.selectedAdjustmentLayer.set({
          brightness: value,
        });
      });
    }
  }
  onContrastChange(value: any) {
    if (
      this.selectedAdjustmentLayer instanceof BrightnessContrastAdjustmentLayer
    ) {
      this.ngZone.runOutsideAngular(() => {
        this.selectedAdjustmentLayer.set({
          contrast: value,
        });
      });
    }
  }
  onHueChange(value: any) {
    if (this.selectedAdjustmentLayer instanceof HueSaturationLightnees) {
      this.selectedAdjustmentLayer.set({
        hue: value * 255,
      });
    }
  }
  onSaturationChange(value: any) {
    if (this.selectedAdjustmentLayer instanceof HueSaturationLightnees) {
      this.selectedAdjustmentLayer.set({
        saturation: value,
      });
    } else if (this.selectedAdjustmentLayer instanceof Vibrance) {
      this.selectedAdjustmentLayer.set({
        saturation: value,
      });
    }
  }
  onVibranceChange(value: any) {
    if (this.selectedAdjustmentLayer instanceof Vibrance) {
      this.selectedAdjustmentLayer.set({
        vibrance: value,
      });
    }
  }
  onLightnessChange(value: any) {
    if (this.selectedAdjustmentLayer instanceof HueSaturationLightnees) {
      this.selectedAdjustmentLayer.set({
        lightnees: value,
      });
    }
  }
  onYChange(y: any) {
    this.selectedLayer.elem.style.top = y + 'px';
  }
  onWidthChange(width: any) {
    this.selectedLayer.elem.style.width = width + 'px';
  }
  onHeightChange(height: any) {
    this.selectedLayer.elem.style.height = height + 'px';
  }
  onLineHeightChange($event: string) {
    throw new Error('Method not implemented.');
  }
  onSelectedTypeLayerFontFamilyChange($event: string) {
    throw new Error('Method not implemented.');
  }
  onTextSizeChange(size: number) {}
  setTextAlignment(align: string) {}
  onFillChange(e: any) {
    this.selectedLayer.elem.style.background = e.target.value;
  }
  onStrokeChange(e: any) {
    this.selectedLayer.elem.style.border = `solid ${e.target.value}`;
  }
  onStrokeWidthChange(width: string) {}
  ngOnDestroy(): void {
    this.data.selectedAjLayers.unsubscribe();
    this.data.selectedLayers.unsubscribe();
  }
}
