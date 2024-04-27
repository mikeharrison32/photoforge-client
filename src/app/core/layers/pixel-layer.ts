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

  uniform vec2 u_resolution;  // Canvas resolution
  uniform vec2 u_center;      // Center of the circle
  uniform float u_radius;     // Radius of the circle




vec3 adjustBrightness(vec3 color, float brightness) {
    return color + brightness;
}

vec3 adjustContrast(vec3 color, float contrast) {
  return 0.5 + (contrast + 1.0) * (color.rgb - 0.5);
}


// vec3 adjustVibrance(vec3 color, float v) {
//   return 0.1;
// }

vec3 adjustSaturation(vec3 color, float saturation) {
  // WCAG 2.1 relative luminance base
  const vec3 luminanceWeighting = vec3(0.2126, 0.7152, 0.0722);
  vec3 grayscaleColor = vec3(dot(color, luminanceWeighting));
  return mix(grayscaleColor, color, 1.0 + saturation);
}

void main() {
    vec4 color = texture2D(textureSampler, texCoords);


    // Calculate the distance from the current pixel to the center of the circle

    //vec2 center = vec2(0.5, 0.5); // Assuming the texture is centered
    float distance = distance(gl_FragCoord.xy / u_resolution, u_center);


    // Check if the pixel is inside the circle
    if (distance <= u_radius) {
      color.a = 0.0;
      gl_FragColor = color;
    } else {
      gl_FragColor = color;
    }
}`;
  adjustmentLayers: AdjustmentLayer[] = [];
  filters = {
    brightnees: 0,
    contrast: 0,
    saturation: 0,
    vibrance: 0,
    hue: 0,
    lightnees: 0,
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
    projectId: string,
    img: any
  ) {
    super(renderer, data, id, name, projectId);
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('layer');
    this.type = 'pixel';

    this.renderer.appendChild(this.elem, this.canvas);

    this.width = img.width;
    this.height = img.height;
    this.elem.style.width = img.width + 'px';
    this.elem.style.height = img.height + 'px';

    this.img = img;
    this.src = img.src;

    this.gl = this.canvas.getContext('webgl2');

    this.resizeCanvasToDisplaySize(this.canvas);
    const displayScale = data.zoom.getValue() / 100;
    this.resizer.setWidth(img.width * displayScale);
    this.resizer.setHeight(img.height * displayScale);

    //Draw the image for the first time
    this.render();

    // this.circle();
    // this.render();
  }

  private circle() {
    const resolutionUniform = this.gl?.getUniformLocation(
      this.program!,
      'u_resolution'
    );
    const radiusUniform = this.gl?.getUniformLocation(
      this.program!,
      'u_radius'
    );
    const circleCenterUniform = this.gl?.getUniformLocation(
      this.program!,
      'u_center'
    );

    // Set canvas resolution uniform
    console.log(this.canvas.width, this.canvas.height);
    this.gl?.uniform2f(
      resolutionUniform!,
      this.canvas.width,
      this.canvas.height
    );

    // Set circle parameters (center and radius)
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const radius = 0.1;
    this.gl?.uniform2f(circleCenterUniform!, 0.5, 0.5);
    this.gl?.uniform1f(radiusUniform!, radius);
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

  render() {
    if (!this.program) {
      console.log('Createing Program...');
      console.log(this.img);
      document.body.appendChild(this.img);
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
    // const vibranceUniformLocation = this.gl?.getUniformLocation(
    //   program,
    //   'u_vibrance'
    // );
    this.gl?.uniform1f(brightneesUniformLocation!, this.filters.brightnees);
    this.gl?.uniform1f(contrastUniformLocation!, this.filters.contrast);
    this.gl?.uniform1f(saturationUniformLocation!, this.filters.saturation);
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
