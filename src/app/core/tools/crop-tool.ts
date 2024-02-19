import { Canvas } from '../canvas';
import { Corner } from '../corner';
import { DraggableBehaviour } from '../draggable-behavior';
import { MouseDragEvent } from '../event';
import { fabric } from 'fabric';
import * as PIXI from 'pixi.js-legacy';
export class CropTool {
  type: string = 'cropTool';
  properties?: ICropToolProperties;
  cropCanvas?: PIXI.Application;
  corners: Corner[] = [];
  border!: PIXI.Graphics;
  trCorner!: Corner;
  mbCorner!: Corner;
  mrCorner!: Corner;
  mlCorner!: Corner;
  mtCorner!: Corner;
  blCorner!: Corner;
  brCorner!: Corner;
  tlCorner!: Corner;
  drawingSurface?: PIXI.Sprite;
  texture!: PIXI.RenderTexture;

  configure(display: HTMLElement) {
    if (this.cropCanvas) {
      return;
    }
    this.cropCanvas = new PIXI.Application({
      resizeTo: display.parentElement!,
      background: 'transparent',
      backgroundAlpha: 0,
      antialias: true,
      resolution: 1,
    });
    this.createCropBorder();
    (this.cropCanvas.view as any).classList.add('crop-canvas');
    display.parentElement?.appendChild(this.cropCanvas.view as any);

    this.texture = PIXI.RenderTexture.create({
      width: this.cropCanvas?.view.width,
      height: this.cropCanvas?.view.height,
    });
    this.drawingSurface = new PIXI.Sprite(this.texture);
    this.cropCanvas.stage.addChild(this.drawingSurface);
    this.drawingSurface.eventMode = 'static';
    this.createTopLeftCorner();
    this.createTopRightCorner();
    // this.corners.push(
    //   this.trCorner,
    //   this.tlCorner,
    //   this.brCorner,
    //   this.blCorner,
    //   this.mtCorner,
    //   this.mlCorner,
    //   this.mrCorner,
    //   this.mbCorner
    // );

    // display.parentElement.appendChild(this.cropCanvas.elem!);
  }

  private createCropBorder() {
    this.border = new PIXI.Graphics();
    // this.border.beginFill('red', 1);
    this.border.eventMode = 'static';
    this.border.on('pointerover', (e) => {
      console.log('popop');
    });
    this.border.lineStyle(3, '#fff');
    this.border.drawRoundedRect(
      20,
      20,
      this.cropCanvas!.screen.width - 50,
      this.cropCanvas!.screen.height - 50,
      4
    );
    this.cropCanvas?.stage.addChild(this.border);
  }

  private createMiddleBottomCorner() {}

  private createMiddleRightCorner() {}

  private createMiddleLeftCorner() {}

  private createMiddleTopCorner() {}

  private createBottomLeftCorner() {}

  private createBottomRightCorner() {}

  private createTopLeftCorner() {
    const tlCorner = new PIXI.Graphics();
    tlCorner.beginFill('#fff', 1);
    tlCorner.drawRoundedRect(15, 15, 30, 8, 5);
    tlCorner.drawRoundedRect(15, 15, 8, 30, 5);
    tlCorner.endFill();

    tlCorner.on('pointerdown', (e) => {
      console.log(e);
    });
    tlCorner.eventMode = 'static';
    this.cropCanvas?.stage.addChild(tlCorner);
    let mousedown = false;
    this.drawingSurface?.addEventListener('mousedown', (e) => {
      mousedown = true;
      console.log('drawing');
      tlCorner.position.set(e.data.global.x, e.data.global.y);
    });
    this.drawingSurface?.addEventListener('mousemove', (e) => {
      tlCorner.position.set(e.data.global.x, e.data.global.y);
      this.border.position.set(e.global.x, e.global.y);
      this.cropCanvas?.renderer.render(tlCorner, {
        renderTexture: this.texture,
        clear: true,
      });
    });
  }

  private createTopRightCorner() {
    const trCorner = new PIXI.Graphics();
    trCorner.beginFill('#fff', 1);
    trCorner.drawRoundedRect(this.cropCanvas!.screen.width - 100, 15, 30, 8, 5);
    trCorner.drawRoundedRect(
      this.cropCanvas!.screen.width - 100 + 25,
      15,
      8,
      30,
      5
    );
    trCorner.endFill();

    trCorner.on('mousedown', (e) => {
      console.log(e);
      // trCorner.moveTo(10, e.data.global.y);
      // this.cropCanvas?.renderer.render(trCorner, {
      //   renderTexture: texture,
      //   clear: false,
      // });
    });
    // this.drawingSurface!.eventMode = 'static';

    this.drawingSurface?.on('mousedown', (e) => {
      console.log('drawing');
      // trCorner.position.set(e.data.global.x, e.data.global.y);
    });
    this.cropCanvas?.renderer.render(trCorner, {
      renderTexture: this.texture,
      clear: false,
    });
    this.cropCanvas?.stage.addChild(trCorner);
  }

  disconfigure(display: HTMLElement): void {
    this.cropCanvas?.destroy(true);
    delete this.cropCanvas;
  }
  straiten() {}
  clear() {}
  complite() {}
  cancel() {}
  rearrange() {}
  render(display: HTMLElement) {}
  placeCorners() {}
}

export const cropTool = new CropTool();

interface ICropToolProperties {
  height?: number;
  resolution?: number;
  unit?: string;
  deleteCropedPixels?: boolean;
}
