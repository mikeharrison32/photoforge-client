import { Brush } from '../brush';
import { MouseDragEvent } from '../event';
import { Layer } from '../layers/layer';
import { PixelLayer } from '../layers/pixel-layer';
import { DataService } from '../services/data.service';

export class EraserTool {
  properties?: IEraserToolProperties;
  brush?: Brush;
  readonly type: string = 'eraserTool';
  mouseDownListener!: (e: any) => void;
  mouseMoveListener!: (e: any) => void;
  mouseUpListener!: (e: any) => void;
  configure(display: HTMLElement, data: DataService) {
    this.brush = new Brush({ size: 50 });
    display.parentElement?.parentElement?.appendChild(this.brush.elem!);
    display.parentElement!.parentElement!.style.cursor = 'none';
    display.parentElement!.style.cursor = 'none';
    display.style.cursor = 'none';

    const rect = display.parentElement?.parentElement?.getBoundingClientRect();
    let selectedLayer: PixelLayer | undefined;
    let mousedown = false;

    let zoom: number;
    let prevPoint: { x: number; y: number };
    this.mouseDownListener = (e: any) => {
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
    };
    this.mouseMoveListener = (e: any) => {
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
      const x = (e.clientX - selectedLayerRect.left - brushSize / 2) / zoom;
      const y = (e.clientY - selectedLayerRect.top - brushSize / 2) / zoom;

      selectedLayer.insertPixels(array, x, y, brushSize, brushSize);
    };

    this.mouseUpListener = (e: any) => {
      mousedown = false;
    };
    display.parentElement!.addEventListener(
      'mousedown',
      this.mouseDownListener
    );
    document.addEventListener('mousemove', this.mouseMoveListener);
    document.addEventListener('mouseup', this.mouseUpListener);
  }

  disconfigure(display: HTMLElement): void {
    document.removeEventListener('mousemove', this.mouseMoveListener);
    document.removeEventListener('mouseup', this.mouseUpListener);
    display.removeEventListener('mousedown', this.mouseDownListener);
    this.brush?.elem?.remove();
    delete this.brush;
  }
}

interface IEraserToolProperties {
  size?: number;
  mode?: string;
}

export const eraserTool = new EraserTool();
