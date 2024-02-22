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
    img: any | PIXI.Texture,
    width?: number,
    height?: number
  ) {
    super(containerElem, id, name, projectId, true);
    this.type = 'pixel';

    if (img instanceof PIXI.Texture) {
      this.setWidth(containerElem!.clientWidth);
      this.setHeight(containerElem!.clientHeight);
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
      this.setWidth(img.width);
      this.setHeight(img.height);
      this.app = new PIXI.Application({
        view: this.canvas as any,
        backgroundColor: 'transparent',
        backgroundAlpha: 0,
      });
      this.src = img.src;
      this.img = img;
      this.insertImage();
    }
  }

  private async insertImage() {
    const sprite = PIXI.Sprite.from(this.src || '');
    sprite.name = 'image';
    sprite.width = this.app!.screen.width;
    sprite.height = this.app!.screen.height;
    // const data = await this.app?.renderer.extract.pixels(
    //   sprite,
    //   new PIXI.Rectangle(100, 100, 300, 300)
    // );

    // console.log(data);
    // const sp = PIXI.Sprite.from(t)
    // sprite.scale = new PIXI.Point(0.3, 0.4);
    this.app!.stage.addChild(sprite);
  }
  getSprite() {
    return this.app?.stage.getChildByName('image');
  }
}
