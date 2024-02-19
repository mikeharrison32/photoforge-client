import { drawImage } from 'src/app/core/utils/webglUtils';
import { PixelLayer } from '../pixel-layer';
import { AdjustmentLayer } from './adjustment_layer';
import { applyBrightnees, applyContrast } from '../../filters';
import * as PIXI from 'pixi.js-legacy';
import { NgZone } from '@angular/core';
export class HueSaturationLightnees extends AdjustmentLayer {
  id!: string;
  hue: number = 1;
  saturation: number = 1;
  lightnees: number = 1;
  hueFilter?: PIXI.ColorMatrixFilter;
  satutateFilter?: PIXI.ColorMatrixFilter;
  lightneesFilter?: PIXI.ColorMatrixFilter;

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
      this.hue = options.hue;
      this.saturation = options.saturation;
      this.lightnees = options.lightnees;
      const img = pl.app?.stage.getChildByName('image');
      this.hueFilter = new PIXI.ColorMatrixFilter();
      this.satutateFilter = new PIXI.ColorMatrixFilter();
      this.lightneesFilter = new PIXI.ColorMatrixFilter();
      if (img?.filters) {
        img!.filters.push(this.hueFilter);
        img!.filters.push(this.satutateFilter);
        img!.filters.push(this.lightneesFilter);
      } else {
        img!.filters = [
          this.hueFilter,
          this.satutateFilter,
          this.lightneesFilter,
        ];
      }
      pl.app?.render();
    }
  }

  hide() {
    const gl = this.pl?.gl;
    if (!gl) {
      return;
    }
    drawImage(gl, this.pl?.img);
  }
  set(options: IHueSaturationLightneesOptions, ngZone: NgZone) {
    ngZone.runOutsideAngular(() => {
      const img = this.pl?.app?.stage.getChildByName('image');
      if (img?.filters) {
        const hueIndex = img.filters.indexOf(this.hueFilter!);
        const saturateIndex = img.filters.indexOf(this.satutateFilter!);
        const lightneesIndex = img.filters.indexOf(this.lightneesFilter!);
        img.filters.splice(hueIndex, 1);
        img.filters.splice(saturateIndex, 1);
        img.filters.splice(lightneesIndex, 1);
        this.hueFilter?.hue(options.hue, false);
        this.satutateFilter?.saturate(options.saturation, false);
        this.lightneesFilter?.brightness(options.lightnees, false);
        img.filters.push(this.hueFilter!);
        img.filters.push(this.satutateFilter!);
        img.filters.push(this.lightneesFilter!);
        this.hue = options.hue;
        this.saturation = options.saturation;
        this.lightnees = options.lightnees;
      } else {
        img!.filters = [
          this.hueFilter!,
          this.satutateFilter!,
          this.lightneesFilter!,
        ];
      }
      this.pl?.app?.render();
    });
  }
  override show() {}
  clear() {}
}

interface IHueSaturationLightneesOptions {
  hue: number;
  saturation: number;
  lightnees: number;
}
