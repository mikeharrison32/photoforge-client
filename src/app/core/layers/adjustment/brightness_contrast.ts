import { drawImage } from 'src/app/core/utils/webglUtils';
import { PixelLayer } from '../pixel-layer';
import { AdjustmentLayer } from './adjustment_layer';
import { applyBrightnees, applyContrast } from '../../filters';
import * as PIXI from 'pixi.js-legacy';
import { NgZone } from '@angular/core';
export class BrightnessContrastAdjustmentLayer extends AdjustmentLayer {
  id!: string;
  constructor(
    pl: PixelLayer,
    name: string,
    options?: IBrightnessContrastAdjustmentLayerOptions
  ) {
    super(pl);
    this.name = name;
    this.id = `${Math.random()}`;
    this.type = 'brightnessContrast';
  }

  set(options: IBrightnessContrastAdjustmentLayerOptions) {
    if (options.brightness) {
      this.pl!.filters.brightnees = options.brightness;
      console.log('bright');
    }

    if (options.contrast) {
      this.pl!.filters.contrast = options.contrast;
    }
    this.pl?.render();
  }
  override show(ngZone: NgZone) {
    this.visible = true;
  }

  override hide(ngZone: NgZone) {
    this.visible = false;
  }
  clear() {}
}

interface IBrightnessContrastAdjustmentLayerOptions {
  brightness?: number;
  contrast?: number;
}
