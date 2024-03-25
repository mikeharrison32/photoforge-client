import * as PIXI from 'pixi.js-legacy';
import { NgZone } from '@angular/core';
import { AdjustmentLayer } from './adjustment_layer';
import { PixelLayer } from '../pixel-layer';
export class Vibrance extends AdjustmentLayer {
  id!: string;
  vibrance: number = 1;
  saturation: number = 1;

  constructor(pl: PixelLayer, name: string, options?: IVibranceOptions) {
    super(pl);
    this.name = name;
    this.id = `${Math.random()}`;
    this.type = 'vibrance';
    if (options) {
      this.set(options);
    }
    this.pl?.render();
  }

  override hide(ngZone: NgZone) {}
  set(options: IVibranceOptions) {
    if (options?.vibrance) {
      this.pl!.filters.vibrance = options.vibrance;
    }

    if (options?.saturation) {
      this.pl!.filters.saturation = options.saturation;
    }

    this.pl?.render();
  }
  override show() {}
  clear() {}
}

interface IVibranceOptions {
  vibrance?: number;
  saturation?: number;
}
