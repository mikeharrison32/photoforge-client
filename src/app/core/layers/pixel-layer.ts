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
  adjustmentLayers: AdjustmentLayer[] = [];
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
    this.type = 'pixel';
    this.renderer.appendChild(this.elem, this.canvas);

    this.renderer.listen(this.canvas, 'mousedown', (e) => {
      data.selectedLayers.getValue()[0].resizer.disable();
      data.selectedLayers.next([...data.selectedLayers.getValue(), this]);
      this.resizer.enable();
    });

    // this.canvas!.style.clipPath = 'url(#bob)';
    if (img instanceof PIXI.Texture) {
      this.setWidth(data.selectedProject.getValue()?.Width || 800);
      this.setHeight(data.selectedProject.getValue()?.Height || 800);
      this.app = new PIXI.Application({
        view: this.canvas as any,
        backgroundColor: 'transparent',
        backgroundAlpha: 0,
      });
      const sprite = new PIXI.Sprite(img);
      sprite.width = this.app.screen.width;
      sprite.height = this.app.screen.height;
      sprite.name = 'image';
      this.app.stage.addChild(sprite);
    } else {
      this.elem.style.width = img.width + 'px';
      this.elem.style.height = img.height + 'px';
      // this.canvas.style.width = img.width + 'px';
      // this.canvas.style.height = img.height + 'px';
      this.app = new PIXI.Application({
        view: this.canvas as any,
        backgroundColor: 'transparent',
        backgroundAlpha: 0,
      });
      this.img = img;
      this.src = img.src;
      this.insertImage();
      const displayScale = data.zoom.getValue() / 100;
      this.resizer.setWidth(img.width * displayScale);
      this.resizer.setHeight(img.height * displayScale);
    }
  }

  private async insertImage() {
    const sprite = PIXI.Sprite.from(this.src || '');
    sprite.name = 'image';
    sprite.width = this.app!.screen.width;
    sprite.height = this.app!.screen.height;

    this.app!.stage.addChild(sprite);
    this.getPixels();
  }
  getPixels() {}
  getSprite() {
    return this.app?.stage.getChildByName('image');
  }
}
