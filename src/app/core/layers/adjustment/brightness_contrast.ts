import { drawImage } from 'src/app/core/utils/webglUtils';
import { PixelLayer } from '../pixel-layer';
import { AdjustmentLayer } from './adjustment_layer';
import { applyBrightnees, applyContrast } from '../../filters';
import * as PIXI from 'pixi.js-legacy';
import { NgZone } from '@angular/core';
export class BrightnessContrastAdjustmentLayer extends AdjustmentLayer {
  brightness: number = 0;
  id!: string;
  contrast: number = 0;
  brightnessFilter?: PIXI.ColorMatrixFilter;
  contrastFilter?: PIXI.ColorMatrixFilter;

  constructor(
    pl: PixelLayer,
    name: string,
    options?: IBrightnessContrastAdjustmentLayerOptions
  ) {
    super(pl);
    this.name = name;
    this.id = `${Math.random()}`;
    this.type = 'brightnessContrast';
    if (options) {
      this.brightness = options.brightness;
      this.contrast = options.contrast;
      this.brightnessFilter = new PIXI.ColorMatrixFilter();
      this.contrastFilter = new PIXI.ColorMatrixFilter();
      this.brightnessFilter.brightness(0.8, false);
      this.contrastFilter.contrast(0.9, false);
      const img = pl.app?.stage.getChildByName('image');
      if (img?.filters) {
        img!.filters.push(this.brightnessFilter);
        img!.filters.push(this.contrastFilter);
      } else {
        img!.filters = [this.brightnessFilter, this.contrastFilter];
      }
      pl.app?.render();
    }
  }

  hide() {}
  set(options: IBrightnessContrastAdjustmentLayerOptions, ngZone: NgZone) {
    ngZone.runOutsideAngular(() => {
      const img = this.pl?.app?.stage.getChildByName('image');
      if (img?.filters) {
        const brightnessIndex = img.filters.indexOf(this.brightnessFilter!);
        const contrastIndex = img.filters.indexOf(this.contrastFilter!);
        img.filters.splice(brightnessIndex, 1);
        img.filters.splice(contrastIndex, 1);
        this.brightnessFilter?.brightness(options.brightness, false);
        this.contrastFilter?.contrast(options.contrast, false);
        this.brightness = options.brightness;
        this.contrast = options.contrast;
        img.filters.push(this.brightnessFilter!);
        img.filters.push(this.contrastFilter!);
        // img!.filters.push(brightnessContrast);
      } else {
        img!.filters = [this.brightnessFilter!, this.contrastFilter!];
      }
      this.pl?.app?.render();
    });
  }
  override show() {}
  clear() {}
}

interface IBrightnessContrastAdjustmentLayerOptions {
  brightness: number;
  contrast: number;
}
