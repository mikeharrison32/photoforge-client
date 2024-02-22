import { Brush } from '../brush';
import { MouseDragEvent } from '../event';
import { PixelLayer } from '../layers/pixel-layer';

export class CloneStampTool {
  type: string = 'cloneStampTool';
  firstBrush?: Brush;
  secondBrush?: Brush;
  configure(display: HTMLElement, layer: PixelLayer) {
    this.firstBrush = new Brush({ size: 30 });
    display.parentElement?.appendChild(this.firstBrush.elem!);
    display.parentElement!.style.cursor = 'none';
    const rect = display.parentElement?.parentElement!.getBoundingClientRect();
    this.secondBrush = new Brush({ size: 30 });
    display.parentElement?.appendChild(this.secondBrush.elem!);
    document.addEventListener('mousemove', (e) => {
      if (e.ctrlKey) {
        this.secondBrush?.moveTo(
          e.x - rect!.left - this.secondBrush.elem!.clientWidth / 2,
          e.y - rect!.top - this.secondBrush.elem!.clientHeight / 2
        );
        return;
      }
      this.firstBrush?.moveTo(
        e.x - rect!.left - this.firstBrush.elem!.clientWidth / 2,
        e.y - rect!.top - this.firstBrush.elem!.clientHeight / 2
      );
    });

    display.addEventListener('mousedown', (e) => {
      if (!this.secondBrush && e.ctrlKey) {
        this.secondBrush = new Brush({ size: 30 });
        display.parentElement?.appendChild(this.secondBrush.elem!);
      } else if (this.secondBrush && e.ctrlKey) {
        this.secondBrush.moveTo(e.clientX, e.clientY);
      }
    });
  }

  disconfigure(display: HTMLElement): void {
    this.firstBrush?.elem?.remove();
    this.secondBrush?.elem?.remove();
    delete this.firstBrush;
    delete this.secondBrush;
    display.parentElement!.style.cursor = 'default';
  }
}

export const cloneStampTool = new CloneStampTool();
