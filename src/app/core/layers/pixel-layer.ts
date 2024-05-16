import { hueRotate } from '../filters/hue-rotate';
import { rgbaFormatter } from '../rgba-formater';
import { Layer } from './layer';
import { IColorRGBA } from 'src/app/types/color';
import { vibrance } from '../filters/vibrance';
import { AdjustmentLayer } from './adjustment/adjustment_layer';
import { BrightnessContrastAdjustmentLayer } from './adjustment/brightness_contrast';
import {
  createProgram,
  drawImage,
  drawRectangle,
  getPixels,
  insertPixels,
} from 'src/app/core/utils/webglUtils';
import * as PIXI from 'pixi.js-legacy';
import { applyBrightneesFromProgram } from '../filters';
import { Renderer2 } from '@angular/core';
import { DataService } from '../services/data.service';
import { Mask } from '..';
export class PixelLayer extends Layer {
  pixels?: Uint8Array;
  src?: string;
  width!: number;
  height!: number;
  private fragmentShaderSource = `
  uniform sampler2D textureSampler;
  precision highp float;
  varying vec2 texCoords;
  uniform float u_brightnees;
  uniform float u_contrast;
  uniform float u_vibrance;
  uniform float u_saturation;
  uniform float u_hue;

  uniform float u_exposure;
  uniform float u_gamma;
  uniform float u_exposure_offset;

  uniform float u_cb_red;
  uniform float u_cb_green;
  uniform float u_cb_blue;


  uniform vec2 u_resolution;  // Canvas resolution
  uniform vec2 u_center;      // Center of the circle
  uniform float u_radius;     // Radius of the circle




vec3 adjustBrightness(vec3 color, float brightness) {
    return color + brightness;
}

vec3 adjustContrast(vec3 color, float contrast) {
  return 0.5 + (contrast + 1.0) * (color.rgb - 0.5);
}

// Define a function-like snippet for vibrance adjustment
void adjustVibrance(inout vec3 color, float vibrance) {
    float average = (color.r + color.g + color.b) / 3.0;
    float maxColor = max(max(color.r, color.g), color.b);
    float colorVariance = maxColor - average;
    float adjustment = (1.0 - colorVariance) * vibrance;

    color = mix(vec3(average), color, adjustment);
}

// Define a function-like snippet for hue shifting
void hueShift(inout vec3 color, float shift) {
    // Convert RGB to HSL
    float chromaMax = max(color.r, max(color.g, color.b));
    float chromaMin = min(color.r, min(color.g, color.b));
    float chromaDelta = chromaMax - chromaMin;
    float hue = 0.0;
    if (chromaDelta == 0.0) {
        hue = 0.0;
    } else if (chromaMax == color.r) {
        hue = mod((color.g - color.b) / chromaDelta, 6.0);
    } else if (chromaMax == color.g) {
        hue = ((color.b - color.r) / chromaDelta) + 2.0;
    } else {
        hue = ((color.r - color.g) / chromaDelta) + 4.0;
    }
    hue = hue / 6.0;
    hue = mod(hue + shift, 1.0);

    // Convert HSL back to RGB
    float c = (1.0 - abs(2.0 * color.r - 1.0));
    float x = c * (1.0 - abs(mod(hue * 6.0, 2.0) - 1.0));
    float m = color.r - 0.5 * c;
    if (0.0 <= hue && hue < 1.0/6.0) {
        color = vec3(c, x, 0.0);
    } else if (1.0/6.0 <= hue && hue < 2.0/6.0) {
        color = vec3(x, c, 0.0);
    } else if (2.0/6.0 <= hue && hue < 3.0/6.0) {
        color = vec3(0.0, c, x);
    } else if (3.0/6.0 <= hue && hue < 4.0/6.0) {
        color = vec3(0.0, x, c);
    } else if (4.0/6.0 <= hue && hue < 5.0/6.0) {
        color = vec3(x, 0.0, c);
    } else {
        color = vec3(c, 0.0, x);
    }
    color += vec3(m);
}

vec3 adjustSaturation(vec3 color, float saturation) {
  // WCAG 2.1 relative luminance base
  const vec3 luminanceWeighting = vec3(0.2126, 0.7152, 0.0722);
  vec3 grayscaleColor = vec3(dot(color, luminanceWeighting));
  return mix(grayscaleColor, color, 1.0 + saturation);
}


// Define a function-like snippet for exposure adjustment with offset and gamma correction
void adjustExposure(inout vec3 color, float exposure, float offset, float gamma) {
    // Apply exposure adjustment
    color = color * pow(2.0, exposure);

    // Apply offset
    color += offset;

    // Apply gamma correction
    color = pow(color, vec3(1.0 / gamma));
}


// Define a function-like snippet for color balance adjustment
void adjustColorBalance(inout vec3 color, float redBalance, float greenBalance, float blueBalance) {
    // Apply color balance adjustment
    color.r *= redBalance;
    color.g *= greenBalance;
    color.b *= blueBalance;
}

void main() {
    vec4 color = texture2D(textureSampler, texCoords);
    color.rgb = adjustBrightness(color.rgb, u_brightnees);
    color.rgb = adjustContrast(color.rgb, u_contrast);
    color.rgb = adjustSaturation(color.rgb, u_saturation);
    //adjustVibrance(color.rgb, u_vibrance);
    //hueShift(color.rgb, u_hue);
    adjustExposure(color.rgb,u_exposure, u_exposure_offset, u_gamma);
    adjustColorBalance(color.rgb, u_cb_red, u_cb_green, u_cb_blue);
    gl_FragColor = color;

}`;
  adjustmentLayers: AdjustmentLayer[] = [];
  filters = {
    brightnees: 0.0,
    contrast: 0.0,
    saturation: 0.0,
    vibrance: 0.0,
    hue: 0.0,
    lightnees: 0.0,
    exposure: {
      exposure: 0.0,
      gammaCorrection: 1.0,
      offset: 0.0,
    },
    colorBalance: {
      red: 1,
      green: 1,
      blue: 1,
    },
  };
  channels = {
    rgb: true,
    red: true,
    green: true,
    blue: true,
  };
  img: any;
  gl?: WebGLRenderingContext | WebGL2RenderingContext | null;
  canvas!: HTMLCanvasElement;
  program?: WebGLProgram;
  constructor(
    data: DataService,
    renderer: Renderer2,
    id: string,
    name: string,
    projectId: string
  ) {
    super(renderer, data, id, name, projectId);
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('layer');
    this.type = 'pixel';
    this.data = data;
    this.renderer.appendChild(this.elem, this.canvas);

    //Draw the image for the first time
  }

  async insertImageData(data: ImageData, x: number, y: number) {
    const ctx = await this.get2DContext();
    ctx?.putImageData(data, x, y);
  }
  insertImage(img: any) {
    this.width = img.width;
    this.height = img.height;
    this.elem.style.width = img.width + 'px';
    this.elem.style.height = img.height + 'px';

    this.img = img;
    this.src = img.src;

    this.gl = this.canvas.getContext('webgl2');

    this.resizeCanvasToDisplaySize(this.canvas);
    const displayScale = this.data.zoom.getValue() / 100;
    this.resizer.setWidth(img.width * displayScale);
    this.resizer.setHeight(img.height * displayScale);

    this.render();
  }

  private resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
    // Lookup the size the browser is displaying the canvas in CSS pixels.
    const displayWidth = parseInt(this.elem.style.width);
    const displayHeight = parseInt(this.elem.style.height);

    // Check if the canvas is not the same size.
    const needResize =
      canvas.width !== displayWidth || canvas.height !== displayHeight;

    if (needResize) {
      // Make the canvas the same size
      canvas.width = displayWidth;
      canvas.height = displayHeight;
    }

    return needResize;
  }

  get2DContext() {
    this.canvas.remove();

    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('layer');
    this.renderer.appendChild(this.elem, this.canvas);

    const ctx = this.canvas.getContext('2d');
    const img = new Image();

    this.resizeCanvasToDisplaySize(this.canvas);

    return new Promise<CanvasRenderingContext2D>((resolve, reject) => {
      img.src = this.src || '';
      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
        resolve(ctx!);
      };
    });
  }

  render() {
    if (!this.program) {
      console.log('Createing Program...');
      this.program = drawImage(this.gl!, this.img, this.fragmentShaderSource);
    }

    if (!this.program) {
      console.error('No program');
      return;
    }

    const { red, green, blue } = this.channels;
    this.gl?.colorMask(red, green, blue, true);
    this.updateFilters(this.program);
    this.renderGL();
  }

  private updateFilters(program: WebGLProgram) {
    const brightneesUniformLocation = this.gl?.getUniformLocation(
      program,
      'u_brightnees'
    );
    const contrastUniformLocation = this.gl?.getUniformLocation(
      program,
      'u_contrast'
    );
    const saturationUniformLocation = this.gl?.getUniformLocation(
      program,
      'u_saturation'
    );
    const vibranceUniformLocation = this.gl?.getUniformLocation(
      program,
      'u_vibrance'
    );
    const hueUniformLocation = this.gl?.getUniformLocation(program, 'u_hue');

    //exposure
    const exposureUniformLocation = this.gl?.getUniformLocation(
      program,
      'u_exposure'
    );
    const exposureOffsetUniformLocation = this.gl?.getUniformLocation(
      program,
      'u_exposure_offset'
    );
    const gammaUniformLocation = this.gl?.getUniformLocation(
      program,
      'u_gamma'
    );

    this.gl?.uniform1f(
      exposureUniformLocation!,
      this.filters.exposure.exposure
    );
    this.gl?.uniform1f(
      exposureOffsetUniformLocation!,
      this.filters.exposure.offset
    );
    this.gl?.uniform1f(
      gammaUniformLocation!,
      this.filters.exposure.gammaCorrection
    );

    //color balance

    const cbRedUniformLocation = this.gl?.getUniformLocation(
      program,
      'u_cb_red'
    );
    const cbGreenUniformLocation = this.gl?.getUniformLocation(
      program,
      'u_cb_green'
    );
    const cbBlueUniformLocation = this.gl?.getUniformLocation(
      program,
      'u_cb_blue'
    );
    this.gl?.uniform1f(cbRedUniformLocation!, this.filters.colorBalance.red);
    this.gl?.uniform1f(
      cbGreenUniformLocation!,
      this.filters.colorBalance.green
    );
    this.gl?.uniform1f(cbBlueUniformLocation!, this.filters.colorBalance.blue);
    // ----
    this.gl?.uniform1f(brightneesUniformLocation!, this.filters.brightnees);
    this.gl?.uniform1f(contrastUniformLocation!, this.filters.contrast);
    this.gl?.uniform1f(saturationUniformLocation!, this.filters.saturation);
    this.gl?.uniform1f(vibranceUniformLocation!, this.filters.vibrance);
    this.gl?.uniform1f(hueUniformLocation!, this.filters.hue);
  }

  forEachPixels(cb: (x: number, y: number) => void) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        cb(x, y);
      }
    }
  }
  renderGL() {
    this.gl?.clearColor(1.0, 1.0, 1.0, 1.0);
    this.gl?.clear(this.gl?.COLOR_BUFFER_BIT);
    this.gl?.drawArrays(this.gl?.TRIANGLES, 0, 6);
  }
  insertPixels(
    pixels: Uint8Array,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.gl?.texSubImage2D(
      this.gl.TEXTURE_2D,
      0,
      x,
      y,
      width,
      height,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      pixels
    );
    this.renderGL();
  }

  readPixels(x: number, y: number, width: number, height: number) {
    const pixels = new Uint8Array(width * height * 4);

    this.gl?.readPixels(
      x,
      y,
      width,
      height,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      pixels
    );
    return pixels;
  }
}
