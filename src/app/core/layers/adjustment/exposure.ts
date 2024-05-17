import * as PIXI from 'pixi.js-legacy';
import { NgZone } from '@angular/core';
import { AdjustmentLayer } from './adjustment_layer';
import { PixelLayer } from '../pixel-layer';
export class Exposure extends AdjustmentLayer {
  id!: string;
  exposure: number = 1;
  offset: number = 1;
  gammaCorrection: number = 1;

  constructor(pl: PixelLayer, name: string, options?: IExposureOptions) {
    super(pl);
    this.name = name;
    this.id = `${Math.random()}`;
    this.type = 'exposure';
    if (options) {
    }
  }

  override hide(ngZone: NgZone) {}
  set(options: IExposureOptions) {
    if (options.exposure) {
      this.pl!.filters.exposure.exposure = options.exposure;
    }
    if (options.gammaCorrection) {
      this.pl!.filters.exposure.gammaCorrection = options.gammaCorrection;
    }
    if (options.offset) {
      this.pl!.filters.exposure.offset = options.offset;
    }
    this.pl?.render();
  }
  override show() {}
  clear() {}
}

interface IExposureOptions {
  exposure?: number;
  offset?: number;
  gammaCorrection?: number;
}
