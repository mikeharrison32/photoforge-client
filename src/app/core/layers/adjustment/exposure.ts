import * as PIXI from 'pixi.js-legacy';
import { NgZone } from '@angular/core';
import { AdjustmentLayer } from './adjustment_layer';
import { PixelLayer } from '../pixel-layer';
export class Exposure extends AdjustmentLayer {
  id!: string;
  exposure: number = 1;
  offset: number = 1;
  gammaCorrection: number = 1;
  exposureFilter?: PIXI.Filter;
  fragmentShader = `
  precision mediump float;

uniform sampler2D u_texture;  // Input texture
uniform float u_exposure;     // Exposure adjustment
uniform float u_offset;       // Offset adjustment
uniform float u_gamma;        // Gamma correction

varying vec2 v_texCoord;  // Texture coordinate for fragment shader

void main() {
    vec4 color = texture2D(u_texture, v_texCoord);

    // Apply offset adjustment
    color.rgb += u_offset;

    // Apply exposure adjustment
    color.rgb *= u_exposure;

    // Apply gamma correction
    color.rgb = pow(color.rgb, vec3(1.0 / u_gamma));

    // Output the modified color
    gl_FragColor = color;
}

`;

  constructor(pl: PixelLayer, name: string, options?: IExposureOptions) {
    super(pl);
    this.name = name;
    this.id = `${Math.random()}`;
    this.type = 'exposure';
    if (options) {
      this.offset = options.offset;
      this.exposure = options.exposure;
      this.gammaCorrection = options.gammaCorrection;
      const img = pl.app?.stage.getChildByName('image');
      this.exposureFilter = new PIXI.Filter(undefined, this.fragmentShader);
      this.exposureFilter.uniforms['u_exposure'] = options.exposure; // Set the default vibrance strength
      this.exposureFilter.uniforms['u_offset'] = options.offset; // Set the default vibrance strength
      this.exposureFilter.uniforms['u_gamma'] = options.gammaCorrection; // Set the default vibrance strength

      if (img?.filters) {
        img!.filters.push(this.exposureFilter);
      } else {
        img!.filters = [this.exposureFilter];
      }
      pl.app?.render();
    }
  }

  override hide(ngZone: NgZone) {}
  set(options: IExposureOptions, ngZone: NgZone) {
    ngZone.runOutsideAngular(() => {
      const img = this.pl?.getSprite();
      if (img?.filters) {
        const exposureIndex = img.filters.indexOf(this.exposureFilter!);
        img.filters.splice(exposureIndex, 1);
        this.exposureFilter!.uniforms['u_exposure'] = options.exposure; // Set the default vibrance strength
        this.exposureFilter!.uniforms['u_offset'] = options.offset; // Set the default vibrance strength
        this.exposureFilter!.uniforms['u_gamma'] = options.gammaCorrection; // Set the default vibrance strength

        img.filters.push(this.exposureFilter!);
      } else {
        img!.filters = [this.exposureFilter!];
      }
      this.pl?.app?.render();
    });
  }
  override show() {}
  clear() {}
}

interface IExposureOptions {
  exposure: number;
  offset: number;
  gammaCorrection: number;
}
