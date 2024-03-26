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
    this.registerListeners(data, renderer, display);
  }

  private addlassoCanvas(display: HTMLElement) {
    display.appendChild(this.lassoCanvas?.view as any);
  }

  private setupDrawingFeature() {
    // const redrawLess = _.throttle(redraw, 50);

    // drawingSurface.interactive = true;
    let mousedown = false;
    let prevPoint: PIXI.Point = new PIXI.Point();

    this.drawingSurface.on('mousedown', (e) => {
      mousedown = true;
      this.clearCanvas();
      prevPosition.set(e.global.x, e.global.y);
      prevPoint.set(e.global.x, e.global.y);
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
      // const spiltPoints = splitLineIntoSegments(
      //   prevPoint.x / zoom,
      //   prevPoint.y / zoom,
      //   c.global.x / zoom,
      //   c.global.y / zoom,
      //   5
      // );
      this.points.push(c.global.x / zoom, c.global.y / zoom);
      // this.points.push(...spiltPoints);

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

  private clearLassoCanvas(ctx: CanvasRenderingContext2D) {}

  private registerListeners(
    data: DataService,
    renderer: Renderer2,
    display: HTMLElement
  ) {
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

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
    this.drawingSurface.on('rightclick', (e) => {
      console.log('right clicked');
      const poly = new PIXI.Polygon(this.points.map((c) => c * zoom));
      const selectedLayer = this.data?.selectedLayers.getValue()[0];
      if (poly.contains(e.global.x, e.global.y)) {
        const c = {
          x: e.x,
          y: e.y,
          menus: [
            {
              name: 'Layer via Copy',
              click: () => {
                if (selectedLayer instanceof PixelLayer) {
                  const img = new Image();
                  img.src = selectedLayer.src || '';
                  const copyLayer = new PixelLayer(
                    data,
                    renderer,
                    // display,
                    `${Math.random()}`,
                    'Layer 1 Copy',
                    selectedLayer.projectId,
                    img
                  );
                  data.layers.next([...data.layers.getValue(), copyLayer]);
                  const mask = new Mask(copyLayer, this.points);
                }
              },
            },
            {
              name: 'Layer via Cut',
              click: () => {
                console.log('layer via cut');
              },
            },
            {
              name: 'Fill',
              click: () => {
                console.log('fill fill');
              },
            },
          ],
        };
        this.data?.contextMenu.next(c);
      }
    });
  }

  private insertSelection(color: string) {
    const brush = new PIXI.Graphics().beginFill('black');
    const lineFill = new PIXI.Graphics();
    const prevPosition = new PIXI.Point(this.points[0], this.points[1]);
    this.clearCanvas();
    for (let i = 0; i < this.points.length; i += 2) {
      let x = this.points[i];
      let y = this.points[i + 1];
      brush.position.set(x, y);
      this.lassoCanvas?.renderer.render(brush, {
        renderTexture: this.texture,
        clear: false,
      });
      lineFill
        .clear()
        .lineStyle(2, color)
        .moveTo(prevPosition.x, prevPosition.y)
        .lineTo(brush.x, brush.y);
      this.lassoCanvas?.renderer.render(lineFill, {
        renderTexture: this.texture,
        clear: false,
      });
      prevPosition.copyFrom(brush.position);
    }
  }
  adjustPoints(pts: number[], len: number) {
    let prevPoint = new PIXI.Point(pts[0], pts[1]);
    let curPoint = new PIXI.Point(pts[0], pts[1]);
    for (let i = 0; i < pts.length; i += 2) {
      let x1 = pts[i];
      let y1 = pts[i];
      let x2 = pts[i];
      let y2 = pts[i + 1];
      let current_length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      if (current_length != len) {
        let ratio = length / current_length;
        let x2_new = x1 + (x2 - x1) * ratio;
        let y2_new = y1 + (y2 - y1) * ratio;
        pts[i + 1] = x2_new;
        pts[i + 1] = x2_new;
      }
    }
    return pts;
  }
  applySelection(ctx: CanvasRenderingContext2D) {
    this.clearLassoCanvas(ctx);
    const selection = new Selection();
    selection.addFromPoints(this.points);
    this.data?.currentSelection.next(selection);
  }
  disconfigure(): void {
    this.lassoCanvas?.destroy(true);
    delete this.lassoCanvas;
  }
}

export const lassoTool = new LassoTool();
