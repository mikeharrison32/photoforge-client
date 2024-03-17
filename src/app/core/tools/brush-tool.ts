import { Renderer2 } from '@angular/core';
import { Mask } from '..';
import { Brush } from '../brush';
import { MouseDragEvent } from '../event';
import { Layer } from '../layers/layer';
import { PixelLayer } from '../layers/pixel-layer';
import { PfObject } from '../pf-object';
import { DataService } from '../services/data.service';
import { NotificationService } from '../services/notification.service';
import * as PIXI from 'pixi.js-legacy';
export class BrushTool {
  type: string = 'brushTool';
  brush?: Brush;
  texture!: PIXI.RenderTexture;
  drawingSurface!: PIXI.Sprite;
  data!: DataService;
  display!: HTMLElement;
  mouseMoveListener!: (e: any) => void;

  configure(
    display: HTMLElement,
    data: DataService,
    notification: NotificationService,
    renderer: Renderer2
  ) {
    this.data = data;
    this.brush = new Brush({ size: 30 });
    this.display = display;
    display.parentElement!.parentElement!.style.cursor = 'none';
    display.parentElement?.parentElement?.appendChild(this.brush.elem!);
    display.parentElement!.style.cursor = 'none';
    display.style.cursor = 'none';
    const rect = display.parentElement?.parentElement?.getBoundingClientRect();
    let mousedown = false;

    let drawingSurface = document.createElement('div');
    drawingSurface.classList.add('drawing');
    const layer = new Layer(
      renderer,
      display,
      data,
      `${Math.random()}`,
      'Drawing',
      data.selectedProject.getValue()?.Id || 'aaa'
    );
    layer.elem.style.width = `${display.clientWidth}px`;
    layer.elem.style.height = `${display.clientHeight}px`;
    layer.elem.appendChild(drawingSurface);
    data.layers.next([...data.layers.getValue(), layer]);

    document.addEventListener('mouseup', (e) => {
      mousedown = false;
      data.selectedLayers.next([layer]);
    });
    const mask = new Mask(layer);
    display.parentElement?.parentElement!.addEventListener('mousedown', (e) => {
      console.log('br');
      mousedown = true;
    });
    let prevPointX: number, prevPointY: number;
    this.mouseMoveListener = (e) => {
      this.brush?.moveTo(
        e.x - rect!.left - this.brush.elem!.clientWidth / 2,
        e.y - rect!.top - this.brush.elem!.clientHeight / 2
      );
      if (!mousedown) {
        return;
      }

      const colors = data.selectedColors.getValue();
      drawingSurface.style.background = `${colors.fg}`;
      const layerRect = display.getBoundingClientRect();
      const zoom = data.zoom.getValue() / 100;

      mask.reveal(
        (e.clientX - layerRect.left) / zoom,
        (e.clientY - layerRect.top) / zoom,
        30
      );
    };
    document.addEventListener('mousemove', this.mouseMoveListener);
  }
  disconfigure(): void {
    this.brush?.elem?.remove();
    this.brush?.destroy();
    document.removeEventListener('mousemove', this.mouseMoveListener);
    delete this.brush;
  }
}

export const brushTool = new BrushTool();

interface Point {
  x: number;
  y: number;
}

function generatePointsInLine(point1: Point, point2: Point, n: number) {
  let points: number[] = [point1.x, point1.y];
  let dx = (point2.x - point1.x) / n;
  let dy = (point2.y - point1.y) / n;

  for (let i = 1; i < n; i++) {
    let x = point1.x + i * dx;
    let y = point1.y + i * dy;
    points.push(x, y);
  }
  points.push((point2.x, point2.y));
  return points;
}
