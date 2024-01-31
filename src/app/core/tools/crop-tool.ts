import { Canvas } from '../canvas';
import { MouseDragEvent } from '../event';

export class CropTool {
  type: string = 'cropTool';
  properties?: ICropToolProperties;
  cropCanvas?: Canvas;
  corners: Corner[] = [];
  configure(display: HTMLElement) {
    if (this.cropCanvas) {
      return;
    }
    this.cropCanvas = new Canvas({
      width: display.clientWidth,
      height: display.clientHeight,
      x: 0,
      y: 0,
    });

    const ctx = this.cropCanvas.getContext('2d') as CanvasRenderingContext2D;
    ctx!.fillStyle = '#000000b0';

    const trCorner = new Corner(display, 10, 3, 0, 0);
    trCorner.elem?.classList.add('crop-tool-corner');

    new MouseDragEvent(trCorner.elem!, false, (e: any) => {
      const rect = trCorner.elem?.getBoundingClientRect();
      const displayScale = parseFloat(display.style.scale || '1');
      trCorner.moveTo(
        (e.x - rect!.left) / displayScale,
        (e.y - rect!.top) / displayScale
      );
    });

    const tlCorner = new Corner(display, 10, 3, display.clientWidth - 200, 0);
    tlCorner.elem?.classList.add('crop-tool-corner');
    tlCorner.elem!.style.transform = 'rotate(90deg)';
    new MouseDragEvent(tlCorner.elem!, true, (e: any) => {
      tlCorner.moveTo(
        e.x / parseFloat(display.style.scale || '1'),
        e.y / parseFloat(display.style.scale || '1')
      );
    });

    const brCorner = new Corner(display, 10, 3, 0, display.clientHeight - 100);
    brCorner.elem?.classList.add('crop-tool-corner');
    brCorner.elem!.style.transform = 'rotate(270deg)';
    new MouseDragEvent(brCorner.elem!, true, (e: any) => {
      brCorner.moveTo(
        e.x / parseFloat(display.style.scale || '1'),
        e.y / parseFloat(display.style.scale || '1')
      );
    });

    const blCorner = new Corner(
      display,
      10,
      3,
      display.clientWidth - 200,
      display.clientHeight - 200
    );
    blCorner.elem?.classList.add('crop-tool-corner');
    blCorner.elem!.style.transform = 'rotate(180deg)';
    new MouseDragEvent(blCorner.elem!, true, (e: any) => {
      blCorner.moveTo(
        e.x / parseFloat(display.style.scale || '1'),
        e.y / parseFloat(display.style.scale || '1')
      );
    });

    this.corners.push(trCorner, tlCorner, brCorner, blCorner);
    display.appendChild(this.cropCanvas.elem!);
  }

  disconfigure(display: HTMLElement): void {
    this.cropCanvas?.elem?.remove();
    this.corners.forEach((corner) => {
      corner.elem?.remove();
    });
  }
  renderCropCanvas(cropCanvasCtx: CanvasRenderingContext2D) {
    cropCanvasCtx.clearRect(
      0,
      0,
      cropCanvasCtx.canvas.clientWidth,
      cropCanvasCtx.canvas.clientHeight
    );
    cropCanvasCtx.fillStyle = '#000000b0';
    cropCanvasCtx.fillRect(
      0,
      0,
      cropCanvasCtx.canvas.clientWidth,
      cropCanvasCtx.canvas.clientHeight
    );
  }
}

export const cropTool = new CropTool();
interface ICropToolProperties {
  height?: number;
  resolution?: number;
  unit?: string;
  deleteCropedPixels?: boolean;
  contentAware?: boolean;
}

class Corner {
  elem?: HTMLElement;
  parent?: HTMLElement;
  constructor(
    parent: HTMLElement,
    width: number,
    height: number,
    x: number,
    y: number
  ) {
    this.elem = document.createElement('div');
    this.elem.style.background = '#fff';
    this.elem.style.width = width + 'rem';
    this.elem.style.height = height + 'rem';
    this.elem.style.position = 'absolute';
    this.elem.style.left = x + 'px';
    this.elem.style.top = y + 'px';
    this.elem.style.borderRadius = '5px';
    this.elem.style.zIndex = '100000000';
    this.parent = parent;
    parent.appendChild(this.elem);
  }

  moveTo(x: number, y: number) {
    const rect = this.parent!.getBoundingClientRect();
    this.elem!.style.left = x + 'px';
    this.elem!.style.top = y + 'px';
  }
}
