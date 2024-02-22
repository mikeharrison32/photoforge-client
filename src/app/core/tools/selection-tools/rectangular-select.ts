import { Canvas } from '../../canvas';
import { ContextMenu, Menu } from '../../context-menu';
import { MouseDragEvent } from '../../event';
import { Layer } from '../../layers/layer';
import { PixelLayer } from '../../layers/pixel-layer';
import { DataService } from '../../services/data.service';
import * as PIXI from 'pixi.js-legacy';
import { AdjustmentFilter } from '@pixi/filter-adjustment';
import { SelectionContextMenu } from './selection-context-menu';
import { Selection } from '../../selection';
class ReactangularSelect {
  properites?: IRectangularProperties;
  contextMenu?: ContextMenu;
  type: string = 'rectangularSelectTool';
  selectionCanvas?: PIXI.Application;
  selectionRect?: PIXI.Graphics;
  selection?: Selection;
  selectionRectPos!: { x: number; y: number; width: number; height: number };
  texture!: PIXI.RenderTexture;
  drawingSurface!: PIXI.Sprite;
  configure(
    display: HTMLElement,
    selectedLayer: PixelLayer,
    data: DataService
  ): void {
    this.selectionRectPos = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
    this.selectionCanvas = new PIXI.Application({
      resizeTo: display.parentElement!,
      antialias: true,
      resolution: 1,
      background: 'transparent',
      backgroundAlpha: 0,
    });
    this.texture = PIXI.RenderTexture.create({
      width: this.selectionCanvas.screen.width,
      height: this.selectionCanvas.screen.height,
    });
    this.drawingSurface = new PIXI.Sprite(this.texture);
    this.selectionCanvas.stage.addChild(this.drawingSurface);

    this.drawingSurface.eventMode = 'static';
    this.selectionCanvas.stage.eventMode = 'static';
    let mousedown = false;
    this.selectionRect = new PIXI.Graphics();
    this.drawingSurface.on('mousedown', (e) => {
      delete this.selectionRect;
      this.selectionRect = new PIXI.Graphics();
      // this.clearCanvas();
      mousedown = true;
      this.selectionRectPos.x = e.global.x;
      this.selectionRectPos.y = e.global.y;
    });
    this.selectionCanvas.stage.on('mousemove', (e) => {
      if (!mousedown) {
        return;
      }
      delete this.selectionRect;
      this.selectionRect = new PIXI.Graphics();
      this.selectionRect?.lineStyle({ color: '#fff', width: 2 });
      this.selectionRect?.drawRect(
        this.selectionRectPos.x,
        this.selectionRectPos.y,
        e.global.x - this.selectionRectPos.x,
        e.global.y - this.selectionRectPos.y
      );

      this.selectionCanvas?.renderer.render(this.selectionRect!, {
        renderTexture: this.texture,
        clear: true,
      });
    });
    this.drawingSurface.on('mouseup', () => {
      mousedown = false;
    });
    this.drawingSurface.on('rightclick', (e) => {
      e.preventDefault();
      if (this.selection) {
        console.log('right clicked');
      }
    });

    (this.selectionCanvas.view as any).classList.add('crop-canvas');
    display.parentElement?.appendChild(this.selectionCanvas.view as any);
    this.registerListeners();
  }

  layerViaCopy() {}

  private registerListeners() {
    document.addEventListener('keydown', (e) => {
      switch (e.code) {
        case 'Enter':
          if (!this.selectionRect) {
            return;
          }
          this.selection = new Selection(this.selectionCanvas!, [
            this.selectionRectPos.x,
            this.selectionRectPos.y,
          ]);
          this.selection.show();
          break;
      }
    });
  }
  private clearCanvas() {
    const emptyTexture = PIXI.Sprite.from(PIXI.Texture.EMPTY);
    this.selectionCanvas?.renderer.render(emptyTexture, {
      renderTexture: this.texture,
      clear: true,
    });
  }

  setUpContextMenu(display: HTMLElement, x: number, y: number) {
    this.contextMenu = new SelectionContextMenu(display.parentElement!, x, y);
  }
  disconfigure(display: HTMLElement): void {
    this.selectionCanvas?.destroy(true);
    delete this.selectionCanvas;
  }
}

interface IRectangularProperties {
  feather?: number;
  antiAlias?: boolean;
  style?: string;
  width?: number;
  height?: number;
}

export const rectangularSelect = new ReactangularSelect();
