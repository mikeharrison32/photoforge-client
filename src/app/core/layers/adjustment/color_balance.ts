import * as PIXI from 'pixi.js-legacy';
import { NgZone } from '@angular/core';
import { AdjustmentLayer } from './adjustment_layer';
import { PixelLayer } from '../pixel-layer';
export class ColorBalance extends AdjustmentLayer {
  id!: string;
  cyan: number = 1;
  saturation: number = 1;

  constructor(pl: PixelLayer, name: string, options?: IColorBalanceOptions) {
    super(pl);
    this.name = name;
    this.id = `${Math.random()}`;
    this.type = 'colorBalance';
    if (options) {
    }
  }

  override hide() {}
  set(options: IColorBalanceOptions) {
    if (options.blue) {
      this.pl!.filters.colorBalance.blue = options.blue;
    }
    if (options.green) {
      this.pl!.filters.colorBalance.green = options.green;
    }
    if (options.red) {
      this.pl!.filters.colorBalance.red = options.red;
    }

    this.pl?.render();
  }
  override show() {}
  clear() {}
}

interface IColorBalanceOptions {
  red?: number;
  green?: number;
  blue?: number;
}
