import { Injectable } from '@angular/core';
import { ToolService } from './tool.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class LassoSelectService {
  mousedownListener?: () => void;
  mousemoveListener?: () => void;
  mouseupListener?: () => void;
  constructor(private toolService: ToolService, private data: DataService) {}
  configure() {
    this.disConfigure();

    const display = this.data.displayElem.getValue();
    const container = this.data.displayContainer.getValue();
    let selectionCanvas = this.data.selectionCanvas.getValue();
    let ctx: CanvasRenderingContext2D;
    let rect: DOMRect;
    if (!selectionCanvas) {
      selectionCanvas = this.toolService.renderer?.createElement('canvas');
      const displayWidth = parseInt(display!.style.width);
      const displayHeight = parseInt(display!.style.height);

      selectionCanvas!.width = displayWidth;
      selectionCanvas!.height = displayHeight;

      this.toolService.renderer?.addClass(selectionCanvas, 'selection-canvas');
      this.toolService.renderer?.appendChild(container, selectionCanvas);
      this.data.selectionCanvas.next(selectionCanvas);
    }

    let mousedown = false;
    ctx = selectionCanvas?.getContext('2d')!;
    rect = this.data.displayContainer.getValue()?.getBoundingClientRect()!;
    let start = {
      x: 0,
      y: 0,
    };
    this.mousedownListener = this.toolService.renderer?.listen(
      selectionCanvas,
      'mousedown',
      (e) => {
        mousedown = true;
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)'; // Color of the shadow
        ctx.shadowBlur = 1; // Blur level
        // ctx.shadowOffsetX = 1; // Horizontal offset
        // ctx.shadowOffsetY = 1; // Vertical offset
        start.x = e.clientX - rect.left;
        start.y = e.clientY - rect.top;
      }
    );
    this.mousemoveListener = this.toolService.renderer?.listen(
      document,
      'mousemove',
      (e) => {
        if (!mousedown) {
          return;
        }
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx?.lineTo(x, y);
        ctx.stroke();
      }
    );
    this.mouseupListener = this.toolService.renderer?.listen(
      document,
      'mouseup',
      (e) => {
        mousedown = false;
        ctx.lineTo(start.x, start.y);
        ctx.stroke();

        ctx.closePath();
      }
    );
  }

  disConfigure() {
    if (this.mousedownListener) {
      this.mousedownListener();
    }
    if (this.mousemoveListener) {
      this.mousemoveListener();
    }

    if (this.mouseupListener) {
      this.mouseupListener();
    }
  }
}
