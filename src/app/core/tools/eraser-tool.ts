import { Brush } from '../brush';
import { MouseDragEvent } from '../event';
import { Layer } from '../layers/layer';
import { PixelLayer } from '../layers/pixel-layer';
import { DataService } from '../services/data.service';
import * as PIXI from 'pixi.js-legacy';

export class EraserTool {
  properties?: IEraserToolProperties;
  brush?: Brush;
  readonly type: string = 'eraserTool';
  configure(display: HTMLElement, data: DataService) {
    this.brush = new Brush({ size: 50 });
    display.parentElement?.parentElement?.appendChild(this.brush.elem!);
    display.parentElement!.parentElement!.style.cursor = 'none';
    display.style.cursor = 'none';

    const rect = display.parentElement?.parentElement?.getBoundingClientRect();
    let selectedLayer: PixelLayer | undefined;
    let mousedown = false;

    let zoom: number;
    let prevPoint: { x: number; y: number };
    display.parentElement!.addEventListener('mousedown', (e) => {
      const layer = data.selectedLayers.getValue()[0];
      if (!(layer instanceof PixelLayer)) {
        return;
      }
      selectedLayer = layer;
      mousedown = true;
      zoom = data.zoom.getValue() / 100;
      const selectedLayerRect = selectedLayer.elem.getBoundingClientRect();
      const x = e.clientX - selectedLayerRect.left;
      const y = e.clientY - selectedLayerRect.top;
      prevPoint = { x, y };
    });
    document.addEventListener('mousemove', (e) => {
      this.brush?.moveTo(
        e.x - rect!.left - this.brush.elem!.clientWidth / 2,
        e.y - rect!.top - this.brush.elem!.clientHeight / 2
      );

      if (!mousedown || !selectedLayer) {
        return;
      }
      const selectedLayerRect = selectedLayer.elem.getBoundingClientRect();
      let brushSize = 50 / zoom;

      //Initialize the array that's going be used to fill the area
      const array = new Uint8Array(brushSize * brushSize * 4);

      //Get the current position of the cursor
      const x = e.clientX - selectedLayerRect.left;
      const y = e.clientY - selectedLayerRect.top;

      const width = brushSize;
      const height = brushSize;
      //Get the pixels at the x,y postions in a rectangular form
      const pixels_rect = new PIXI.Rectangle(x, y, width, height);
      const copy_pixels: number[] = [];
      const layer_pixels = selectedLayer.pixels!;
      // selectedLayer.forEachPixels((x, y) => {
      //   if (pixels_rect.contains(x, y)) {
      //     console.log('cont..');
      //     const index = (y * width + x) * 4;
      //     copy_pixels.push(layer_pixels[index]);
      //     copy_pixels.push(layer_pixels[index + 1]);
      //     copy_pixels.push(layer_pixels[index + 2]);
      //     copy_pixels.push(layer_pixels[index + 3]);
      //   }
      // });
      // console.log(copy_pixels);
      // array.set(copy_pixels);
      //Fill the array with pixels
      // array.set(pixels);

      //Insert pixels
      selectedLayer.insertPixels(
        array,
        (x - brushSize / 2) / zoom,
        (y - brushSize / 2) / zoom,
        brushSize,
        brushSize
      );
    });

    document.addEventListener('mouseup', (e) => {
      mousedown = false;
      if (selectedLayer) {
        // selectedLayer.updatePixels();
      }
    });
  }
  getPixelsRect(
    pixels: Uint8Array,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    const rectPixels: number[] = [];
    for (let row = y; row < y + height; row++) {
      for (let col = 0; col < x + width; col++) {
        const index = (row * width + col) * 4;
        rectPixels.push(pixels[index]);
        rectPixels.push(pixels[index + 1]);
        rectPixels.push(pixels[index + 2]);
        rectPixels.push(pixels[index + 3]);
      }
    }
    return rectPixels;
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
