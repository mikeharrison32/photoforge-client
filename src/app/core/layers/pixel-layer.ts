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
} from 'src/app/utils/webglUtils';
import * as PIXI from 'pixi.js-legacy';
import { applyBrightneesFromProgram } from '../filters';
export class PixelLayer extends Layer {
  pixels: IColorRGBA[] = [];
  src?: string;
  adjustmentLayers: AdjustmentLayer[] = [];
  img: any;
  gl?: WebGLRenderingContext | WebGL2RenderingContext | null;
  app?: PIXI.Application;
  constructor(
    containerElem: HTMLElement | null,
    id: string,
    name: string,
    projectId: string,
    img: any | ImageData
  ) {
    super(containerElem, id, name, projectId, true);
    this.type = 'pixel';
    this.setWidth(img.width);
    this.setHeight(img.height);
    if (img instanceof ImageData) {
      // this.ctx?.putImageData(img, 0, 0);
    } else {
      this.src = img.src;
      this.img = img;
      this.app = new PIXI.Application({
        view: this.canvas as any,
      });
      const sprite = PIXI.Sprite.from(this.src || '');
      sprite.name = 'image';
      sprite.width = this.app.screen.width;
      sprite.height = this.app.screen.height;

      // sprite.scale = new PIXI.Point(0.3, 0.4);
      this.app.stage.addChild(sprite);
    }
  }
}
