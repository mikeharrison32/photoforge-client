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
    }
  }

  override hide(ngZone: NgZone) {}
  set(options: IExposureOptions) {}
  override show() {}
  clear() {}
}

interface IExposureOptions {
  exposure: number;
  offset: number;
  gammaCorrection: number;
}
