import { Brush } from '../brush';
import { MouseDragEvent } from '../event';
import { PixelLayer } from '../layers/pixel-layer';
import { DataService } from '../services/data.service';
import * as PIXI from 'pixi.js-legacy';

export class EraserTool {
  properties?: IEraserToolProperties;
  brush?: Brush;
  type: string = 'eraserTool';
  configure(display: HTMLElement, data: DataService) {
    this.brush = new Brush({ size: 30 });
    display.parentElement?.appendChild(this.brush.elem!);
    display.parentElement!.style.cursor = 'none';
    display.style.cursor = 'none';

    const rect = display.parentElement?.parentElement?.getBoundingClientRect();
    let mousedown = false;
    document.addEventListener('mouseup', (e) => {
      mousedown = false;
    });
    display.parentElement!.addEventListener('mousedown', (e) => {
      mousedown = true;
    });
    document.addEventListener('mousemove', (e) => {
      this.brush?.moveTo(
        e.x - rect!.left - this.brush.elem!.clientWidth / 2,
        e.y - rect!.top - this.brush.elem!.clientHeight / 2
      );
    });
  }
  erase(layer: PixelLayer, x: any, y: any, size: number) {
    // const ctx =  layer.ctx
    // ctx?.putImageData(new ImageData(size, size), x, y)
  }

  disconfigure(): void {
    this.brush?.elem?.remove();
    delete this.brush;
  }
}

interface IEraserToolProperties {
  size?: number;
  mode?: string;
}

export const eraserTool = new EraserTool();
