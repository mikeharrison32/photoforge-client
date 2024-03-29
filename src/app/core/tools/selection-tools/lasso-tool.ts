import { PixelLayer } from 'src/app/core/layers/pixel-layer';
import { MouseDragEvent } from '../../event';
import { Canvas } from '../../canvas';
import { Selection } from '../../selection';
import { getPixelsWithinCustomSelection, replacePixels } from '../../utils';
import * as PIXI from 'pixi.js-legacy';
import { DataService } from '../../services/data.service';
import { ContextMenu, Menu } from '../../context-menu';
import { Mask } from '../..';
import { Renderer2 } from '@angular/core';
import { splitLineIntoSegments } from './rectangular-select';
export class LassoTool {
  lassoCanvas?: PIXI.Application;
  readonly type: string = 'lassoTool';
  points: number[] = [];
  texture!: PIXI.RenderTexture;
  drawingSurface!: PIXI.Sprite;
  data?: DataService;
  selection?: Selection;
  display?: HTMLElement;
  configure(display: HTMLElement, data: DataService, renderer: Renderer2) {
    this.data = data;
    this.display = display;
    console.log('lasso tool configured.');
    this.lassoCanvas = new PIXI.Application({
      width: display.parentElement?.clientWidth,
      height: display.parentElement?.clientHeight,
      background: 'transparent',
      backgroundAlpha: 0,
      antialias: true,
    });
    this.texture = PIXI.RenderTexture.create({
      width: this.lassoCanvas.screen.width,
      height: this.lassoCanvas.screen.height,
    });
    this.drawingSurface = new PIXI.Sprite(this.texture);
    this.drawingSurface.eventMode = 'static';
    (this.lassoCanvas.view as any).classList.add('lasso-canvas');
    this.addlassoCanvas(display.parentElement!);

    this.setupDrawingFeature();
    this.registerListeners();
  }

  private addlassoCanvas(display: HTMLElement) {
    display.appendChild(this.lassoCanvas?.view as any);
  }

  private setupDrawingFeature() {
    let mousedown = false;
    let prevPoint: PIXI.Point = new PIXI.Point();

    this.drawingSurface.on('mousedown', (e) => {
      this.points = [];
      mousedown = true;
      this.clearCanvas();
      prevPosition.set(e.global.x, e.global.y);
      prevPoint.set(e.global.x, e.global.y);
      const selection = this.data?.currentSelection.getValue();
      console.log(selection);
      if (selection) {
        selection.view?.remove();
        this.data?.currentSelection.next(null);
      }
    });
    let color = '#717171';

    const prevPosition = new PIXI.Point();
    const lineFill = new PIXI.Graphics().beginFill('#717171');
    const brush = new PIXI.Graphics().beginFill('#717171');
    const redraw = (x: number, y: number) => {
      brush.position.set(x, y);
      this.lassoCanvas?.renderer.render(brush, {
        renderTexture: this.texture,
        clear: false,
      });
      lineFill
        .clear()
        .lineStyle(3, color)
        .moveTo(prevPosition.x, prevPosition.y)
        .lineTo(brush.x, brush.y);
      this.lassoCanvas?.renderer.render(lineFill, {
        renderTexture: this.texture,
        clear: false,
      });
      prevPosition.copyFrom(brush.position);
    };

    this.drawingSurface.on('mousemove', (c) => {
      if (!mousedown) {
        return;
      }
      const zoom = this.data!.zoom.getValue() / 100;
      this.points.push(c.global.x / zoom, c.global.y / zoom);

      redraw(c.global.x, c.global.y);

      prevPoint.set(c.global.x, c.global.y);
    });
    this.drawingSurface.on('mouseup', () => {
      mousedown = false;
    });

    this.lassoCanvas?.stage.addChild(this.drawingSurface);
  }

  private clearCanvas() {
    const emptyTexture = PIXI.Sprite.from(PIXI.Texture.EMPTY);

    this.lassoCanvas?.renderer.render(emptyTexture, {
      renderTexture: this.texture,
      clear: true,
    });
  }

  private registerListeners() {
    const zoom = this.data!.zoom.getValue() / 100;
    document.addEventListener('keydown', (e) => {
      if (e.code == 'Enter') {
        this.clearCanvas();
        const selection = new Selection();
        selection.addFromPoints(this.points.map((c) => c * zoom));
        this.data?.currentSelection.next(selection);
        this.points = [];
      }
    });
  }

  disconfigure(): void {
    this.lassoCanvas?.destroy(true);
    delete this.lassoCanvas;
  }
}

export const lassoTool = new LassoTool();
