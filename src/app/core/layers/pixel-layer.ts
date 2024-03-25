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
  pixels: IColorRGBA[] = [];
  src?: string;
  fragmentShaderSource = `
  uniform sampler2D textureSampler;
  precision highp float;
  varying vec2 texCoords;
  uniform float u_brightnees;
  uniform float u_contrast;
  uniform float u_vibrance;
  uniform float u_saturation;
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
    color.rgb = adjustBrightness(color.rgb, u_brightnees);
    color.rgb = adjustContrast(color.rgb,  u_contrast);
    color.rgb = adjustSaturation(color.rgb,  u_saturation);
    //adjustVibrance(color.rgb, u_vibrance);
    gl_FragColor = color;
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
  img: any;
  gl?: WebGLRenderingContext | WebGL2RenderingContext | null;
  app?: PIXI.Application;
  canvas!: HTMLCanvasElement;
  mask?: Mask;
  constructor(
    data: DataService,
    renderer: Renderer2,
    // containerElem: HTMLElement | null,
    id: string,
    name: string,
    projectId: string,
    img: any | PIXI.Texture,
    width?: number,
    height?: number
  ) {
    super(renderer, data, id, name, projectId);
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('layer');

    // this.canvas.width = this.canvas.clientWidth * 2;
    // this.canvas.height = this.canvas.clientHeight * 2;
    this.type = 'pixel';
    this.renderer.appendChild(this.elem, this.canvas);

    this.elem.style.width = img.width + 'px';
    this.elem.style.height = img.height + 'px';
    this.img = img;
    this.src = img.src;
    this.gl = this.canvas.getContext('webgl2');
    const displayScale = data.zoom.getValue() / 100;
    this.resizer.setWidth(img.width * displayScale);
    this.resizer.setHeight(img.height * displayScale);
    // const program = drawImage(this.gl!, this.img, this.fragmentShaderSource);
    this.resizeCanvasToDisplaySize(this.canvas);
    this.render();
  }

  resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
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
    const program = drawImage(this.gl!, this.img, this.fragmentShaderSource);
    if (!program) {
      console.error('no program');
      return;
    }
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
    // this.gl?.uniform1f(vibranceUniformLocation!, this.filters.vibrance);

    this.gl?.clearColor(1.0, 1.0, 1.0, 1.0);
    this.gl?.clear(this.gl?.COLOR_BUFFER_BIT);
    this.gl?.drawArrays(this.gl?.TRIANGLES, 0, 6);

    const displayWidth = parseInt(this.elem.style.width);
    const displayHeight = parseInt(this.elem.style.height);

    let width = 300;
    let height = 300;

    const pixels = new Uint8Array(width * height * 4);

    // const frameBuffer = this.gl?.createFramebuffer();
    // this.gl?.bindFramebuffer(this.gl.FRAMEBUFFER, frameBuffer!);
    // this.gl?.framebufferTexture2D(
    //   this.gl.FRAMEBUFFER,
    //   this.gl.COLOR_ATTACHMENT0,
    //   this.gl.TEXTURE_2D,
    //   null,
    //   0
    // );

    // const status = this.gl?.checkFramebufferStatus(this.gl.FRAMEBUFFER);

    // if (status !== this.gl?.FRAMEBUFFER_COMPLETE) {
    //   console.error('frame buffer is not complete');
    // }
    this.gl?.readPixels(
      0,
      0,
      width,
      height,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      pixels,
      0
    );

    // for (let i = 0; i < pixels.length; i += 4) {
    //   pixels[i] = 255;
    //   // pixels[i + 3] = 255;
    // }

    this.gl?.texSubImage2D(
      this.gl.TEXTURE_2D,
      0,
      30,
      30,
      width,
      height,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      pixels
    );

    const canvas = document.createElement('canvas');
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    const imgData = new ImageData(width, height);
    imgData.data.set(pixels);
    ctx?.putImageData(imgData, 0, 0);
    document.body.appendChild(canvas);
    this.gl?.clearColor(1.0, 1.0, 1.0, 1.0);
    this.gl?.clear(this.gl?.COLOR_BUFFER_BIT);
    this.gl?.drawArrays(this.gl?.TRIANGLES, 0, 6);
  }
}
