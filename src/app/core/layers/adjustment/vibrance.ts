import * as PIXI from 'pixi.js-legacy';
import { NgZone } from '@angular/core';
import { AdjustmentLayer } from './adjustment_layer';
import { PixelLayer } from '../pixel-layer';
export class Vibrance extends AdjustmentLayer {
  id!: string;
  vibrance: number = 1;
  saturation: number = 1;
  vibranceFilter?: PIXI.Filter;
  satutateFilter?: PIXI.ColorMatrixFilter;
  fragmentShader = `
precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float uVibrance;
void main(void) {
    // Sample the texture
    vec4 color = texture2D(uSampler, vTextureCoord);

    // Calculate the average of the RGB components
    float average = (color.r + color.g + color.b) / 3.0;

    // Calculate the maximum and minimum components
    float maxComponent = max(color.r, max(color.g, color.b));
    float minComponent = min(color.r, min(color.g, color.b));

    // Calculate the vibrance
    float vibrance = max(maxComponent - average, average - minComponent);

    // Apply the vibrance effect
    color.rgb += (vibrance - average) * uVibrance;

    // Output the modified color
    gl_FragColor = color;
}`;

  constructor(pl: PixelLayer, name: string, options?: IVibranceOptions) {
    super(pl);
    this.name = name;
    this.id = `${Math.random()}`;
    this.type = 'vibrance';
    if (options) {
      this.saturation = options.saturation;
      const img = pl.app?.stage.getChildByName('image');
      this.satutateFilter = new PIXI.ColorMatrixFilter();
      this.vibranceFilter = new PIXI.Filter(undefined, this.fragmentShader);
      this.vibranceFilter.uniforms['uVibrance'] = 1.0; // Set the default vibrance strength

      if (img?.filters) {
        img!.filters.push(this.satutateFilter);
      } else {
        img!.filters = [this.satutateFilter];
      }
      pl.app?.render();
    }
  }

  override hide(ngZone: NgZone) {}
  set(options: IVibranceOptions, ngZone: NgZone) {
    ngZone.runOutsideAngular(() => {
      const img = this.pl?.getSprite();
      if (img?.filters) {
        const saturationIndex = img.filters.indexOf(this.satutateFilter!);
        const vibranceIndex = img.filters.indexOf(this.vibranceFilter!);

        img.filters.splice(saturationIndex, 1);
        img.filters.splice(vibranceIndex, 1);

        this.vibranceFilter!.uniforms['uVibrance'] = options.vibrance; // Set the default vibrance strength
        this.satutateFilter!.saturate(options.saturation);
        img.filters.push(this.vibranceFilter!);
        img.filters.push(this.satutateFilter!);
      } else {
        img!.filters = [this.satutateFilter!, this.vibranceFilter!];
      }
      this.pl?.app?.render();
    });
  }
  override show() {}
  clear() {}
}

interface IVibranceOptions {
  vibrance: number;
  saturation: number;
}
