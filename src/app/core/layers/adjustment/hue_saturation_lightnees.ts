import { drawImage } from 'src/app/core/utils/webglUtils';
import { PixelLayer } from '../pixel-layer';
import { AdjustmentLayer } from './adjustment_layer';
import { applyBrightnees, applyContrast } from '../../filters';
import * as PIXI from 'pixi.js-legacy';
import { NgZone } from '@angular/core';
export class HueSaturationLightnees extends AdjustmentLayer {
  id!: string;
  hue: number = 0;
  saturation: number = 0;
  lightnees: number = 0;

  constructor(
    pl: PixelLayer,
    name: string,
    options?: IHueSaturationLightneesOptions
  ) {
    super(pl);
    this.name = name;
    this.id = `${Math.random()}`;
    this.type = 'hueSaturationLightnees';
    if (options) {
      this.set(options);
    }
  }

  override hide(ngZone: NgZone) {}
  set(options: IHueSaturationLightneesOptions) {
    if (options.saturation) {
      this.pl!.filters.saturation = options.saturation;
    }
    if (options.hue) {
      this.pl!.filters.hue = options.hue;
    }
    if (options.lightnees) {
      this.pl!.filters.lightnees = options.lightnees;
    }
    this.pl?.render();
  }
  override show() {}
  clear() {}
}

interface IHueSaturationLightneesOptions {
  hue?: number;
  saturation?: number;
  lightnees?: number;
}
