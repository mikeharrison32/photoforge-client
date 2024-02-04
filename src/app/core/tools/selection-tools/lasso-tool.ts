import { PixelLayer } from 'src/app/core/layers/pixel-layer';
import { MouseDragEvent } from '../../event';
import { Canvas } from '../../canvas';

export class LassoTool {
  lassoCanvas?: Canvas;
  type: string = 'lassoTool';
  points: number[] = [];
  configure(display: HTMLElement, layer: PixelLayer) {
    console.log('lasso tool configured.');
    this.lassoCanvas = new Canvas({
      width: display.clientWidth,
      height: display.clientHeight,
      x: 0,
      y: 0,
      position: 'absolute',
    });
    display.appendChild(this.lassoCanvas.elem!);
    const ctx = this.lassoCanvas.getContext('2d') as CanvasRenderingContext2D;

    this.lassoCanvas.elem?.addEventListener('mousedown', (e) => {
      ctx.clearRect(
        0,
        0,
        this.lassoCanvas!.elem!.clientWidth * 2,
        this.lassoCanvas!.elem!.clientHeight * 2
      );
      ctx.beginPath();
      // ctx.moveTo(e.x - lassoRect!.left, e.y - lassoRect!.top);
    });
    new MouseDragEvent(this.lassoCanvas.elem!, true, (e: any) => {
      ctx.lineWidth = 7;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'miter';
      ctx.strokeStyle = 'rgb(255, 255, 155)';
      let scale = parseFloat(display.style.scale || '1');
      this.points.push(e.x, e.y);
      ctx.lineTo((e.x * 2) / scale, (e.y * 2) / scale);
      ctx.stroke();
    });

    document.addEventListener('keydown', (e) => {
      if (e.code == 'Enter') {
        this.applySelection(ctx);
      }
    });
  }
  applySelection(ctx: CanvasRenderingContext2D) {
    ctx.closePath();
    ctx.clearRect(
      0,
      0,
      this.lassoCanvas!.elem!.clientWidth * 2,
      this.lassoCanvas!.elem!.clientHeight * 2
    );
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#fff';

    ctx.beginPath();
    for (let i = 0; i < this.points.length; i += 2) {
      const x = this.points[i];
      const y = this.points[i + 1];
      ctx.lineTo(x * 2, y * 2);
    }
    ctx.closePath();
    ctx.stroke();
  }
  disconfigure(): void {
    this.lassoCanvas?.elem?.remove();
    delete this.lassoCanvas;
  }
}

export const lassoTool = new LassoTool();
