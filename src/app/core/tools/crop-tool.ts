import { Canvas } from '../canvas';
import { DraggableBehaviour } from '../draggable-behavior';
import { MouseDragEvent } from '../event';

export class CropTool {
  type: string = 'cropTool';
  properties?: ICropToolProperties;
  cropCanvas?: Canvas;
  corners: Corner[] = [];
  border?: HTMLDivElement;

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
    ctx!.fillStyle = '#000000b2';

    ctx.fillRect(0, 0, display.clientWidth * 2, display.clientHeight * 2);
    ctx.clearRect(
      50 * 2,
      50 * 2,
      (display.clientWidth - 100) * 2,
      (display.clientHeight - 100) * 2
    );
    this.border = document.createElement('div');
    this.border.style.left = 50 + 'px';
    this.border.style.top = 50 + 'px';
    this.border.style.width = display.clientWidth - 100 + 'px';
    this.border.style.height = display.clientHeight - 100 + 'px';
    this.border.classList.add('crop-tool-border');
    display.appendChild(this.border);

    const trCorner = new Corner(display, 7, 1, 50, 50);
    trCorner.elem?.classList.add('crop-tool-corner');
    const displayScale = parseFloat(display.style.scale || '1');
    new DraggableBehaviour(trCorner.elem!, displayScale, (e: any) => {
      // this.border!.style.left = e.x / displayScale + 'px';
      // this.border!.style.top = e.y / displayScale + 'px';
      // this.border!.style.width = 500 - e.x / displayScale + 'px';
      // this.border!.style.height = 500 - e.y / displayScale + 'px';
      // brCorner.elem!.style.left = e.x / displayScale + 'px';
    });

    const tlCorner = new Corner(display, 7, 1, display.clientWidth - 100, 50);
    new DraggableBehaviour(tlCorner.elem!, displayScale, (e: any) => {
      // this.border!.style.width = 500 - e.x / displayScale + 'px';
      // this.border!.style.height = e.y / displayScale + 'px';
      // this.border!.style.left = e.x / displayScale + 'px';
      // this.border!.style.top = startY + 'px';
    });
    tlCorner.elem?.classList.add('crop-tool-corner');
    tlCorner.elem!.style.transform = 'rotate(90deg)';

    const brCorner = new Corner(display, 7, 1, 50, display.clientHeight - 100);
    brCorner.elem?.classList.add('crop-tool-corner');
    brCorner.elem!.style.transform = 'rotate(270deg)';
    let startY = 100;
    new DraggableBehaviour(brCorner.elem!, displayScale, (e: any) => {
      // this.border!.style.width = 500 - e.x / displayScale + 'px';
      // this.border!.style.height = e.y / displayScale + 'px';
      // this.border!.style.left = e.x / displayScale + 'px';
      // this.border!.style.top = startY + 'px';
      // trCorner.elem!.style.left = e.x / displayScale + 'px';
      // trCorner.elem!.style.top = startY + 'px';
    });

    const blCorner = new Corner(
      display,
      5,
      0.8,
      display.clientWidth - 100,
      display.clientHeight - 100
    );
    blCorner.elem?.classList.add('crop-tool-corner');
    blCorner.elem!.style.transform = 'rotate(180deg)';
    new DraggableBehaviour(blCorner.elem!, displayScale);

    const mtCorner = new Corner(
      display,
      5,
      0.8,
      (display.clientWidth - 100) / 2,
      50
    );
    new DraggableBehaviour(mtCorner.elem!, displayScale);
    const mlCorner = new Corner(
      display,
      5,
      0.8,
      50,
      (display.clientHeight - 100) / 2
    );
    mlCorner.elem!.style.transform = 'rotate(90deg)';
    new DraggableBehaviour(mlCorner.elem!, displayScale);
    const mrCorner = new Corner(
      display,
      5,
      0.8,
      display.clientWidth - 100,
      (display.clientHeight - 100) / 2
    );
    mrCorner.elem!.style.transform = 'rotate(90deg)';
    new DraggableBehaviour(mrCorner.elem!, displayScale);
    const mbCorner = new Corner(
      display,
      5,
      0.8,
      (display.clientWidth - 100) / 2,
      display.clientHeight - 100
    );
    new DraggableBehaviour(mbCorner.elem!, displayScale);

    this.corners.push(
      trCorner,
      tlCorner,
      brCorner,
      blCorner,
      mtCorner,
      mlCorner,
      mrCorner,
      mbCorner
    );
    display.appendChild(this.cropCanvas.elem!);
  }

  disconfigure(display: HTMLElement): void {
    this.cropCanvas?.elem?.remove();
    delete this.cropCanvas;
    this.border?.remove();
    this.corners.forEach((corner) => {
      corner.elem?.remove();
    });
  }
  straiten() {}
  clear() {}
  complite() {}
  cancel() {}
  rearrange() {}
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
