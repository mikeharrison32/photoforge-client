import { Component, Input } from '@angular/core';
import { AdjustmentLayer } from 'src/app/core/layers/adjustment/adjustment_layer';
import { BrightnessContrastAdjustmentLayer } from 'src/app/core/layers/adjustment/brightness_contrast';
import { PixelLayer } from 'src/app/core/layers/pixel-layer';

@Component({
  selector: 'app-brightness-contrast',
  templateUrl: './brightness-contrast.component.html',
  styleUrls: ['./brightness-contrast.component.scss'],
})
export class BrightnessContrastComponent {
  @Input() adjustementLayer?: BrightnessContrastAdjustmentLayer;
  onBrightnessChange(value: any) {
    this.adjustementLayer?.set({
      brightness: value / 100,
    });
  }
  onContrastChange(value: any) {
    this.adjustementLayer?.set({
      contrast: value / 100,
    });
  }
}
