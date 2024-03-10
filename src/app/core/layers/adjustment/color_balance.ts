import * as PIXI from 'pixi.js-legacy';
import { NgZone } from '@angular/core';
import { AdjustmentLayer } from './adjustment_layer';
import { PixelLayer } from '../pixel-layer';
export class ColorBalance extends AdjustmentLayer {
  id!: string;
  cyan: number = 1;
  saturation: number = 1;
  vibranceFilter?: PIXI.Filter;
  satutateFilter?: PIXI.ColorMatrixFilter;
  cyan_fragmentShader = `
  precision highp float;

  uniform sampler2D u_texture;  // Input texture

  varying vec2 v_texCoord;  // Texture coordinate for fragment shader

  void main() {
      vec4 color = texture2D(u_texture, v_texCoord);

      // Compute the cyan channel
      float cyan = color.g - ((color.r + color.b) / 2.0);

      // Increase the cyan channel for a stronger cyan effect
      cyan *= 1.5;

      // Apply the new cyan channel to the color
      color.r += cyan;
      color.g -= cyan;

      // Output the modified color
      gl_FragColor = color;
  }
  `;
  magenta_fragmentShader = `
  precision highp float;

uniform sampler2D u_texture;  // Input texture

varying vec2 v_texCoord;  // Texture coordinate for fragment shader

void main() {
    vec4 color = texture2D(u_texture, v_texCoord);

    // Compute the magenta channel
    float magenta = color.r - ((color.g + color.b) / 2.0);

    // Increase the magenta channel for a stronger magenta effect
    magenta *= 1.5;

    // Apply the new magenta channel to the color
    color.r -= magenta;
    color.g += magenta;

    // Output the modified color
    gl_FragColor = color;
}

`;
  yellow_fragmentShader = `
  precision highp float;

  uniform sampler2D u_texture;  // Input texture

  varying vec2 v_texCoord;  // Texture coordinate for fragment shader

  void main() {
      vec4 color = texture2D(u_texture, v_texCoord);

      // Compute the yellow channel
      float yellow = color.b - ((color.r + color.g) / 2.0);

      // Increase the yellow channel for a stronger yellow effect
      yellow *= 1.5;

      // Apply the new yellow channel to the color
      color.r -= yellow;
      color.b += yellow;

      // Output the modified color
      gl_FragColor = color;
  }


`;

  constructor(pl: PixelLayer, name: string, options?: IVibranceOptions) {
    super(pl);
    this.name = name;
    this.id = `${Math.random()}`;
    this.type = 'colorBalance';
    if (options) {
      this.saturation = options.saturation;
      const img = pl.app?.stage.getChildByName('image');
      this.satutateFilter = new PIXI.ColorMatrixFilter();
      // this.vibranceFilter = new PIXI.Filter(undefined, this.fragmentShader);
      // this.vibranceFilter.uniforms['uVibrance'] = 1.0; // Set the default vibrance strength

      if (img?.filters) {
        img!.filters.push(this.satutateFilter);
      } else {
        img!.filters = [this.satutateFilter];
      }
      pl.app?.render();
    }
  }

  hide() {}
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
