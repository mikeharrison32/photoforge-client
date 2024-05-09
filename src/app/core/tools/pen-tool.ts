import { Renderer2 } from '@angular/core';
import { PixelLayer } from '../layers/pixel-layer';
import { DataService } from '../services/data.service';

export class PenTool {
  readonly type: string = 'penTool';

  configure(
    display: HTMLElement,
    data: DataService,
    renderer: Renderer2
  ): void {
    let mousedown = false;
    renderer.listen(display.parentElement, 'mousedown', (e) => {
      mousedown = true;
    });

    renderer.listen(display.parentElement, 'mousemove', (e) => {
      if (!mousedown) {
        return;
      }
      //curve
    });
    renderer.listen(display.parentElement, 'mouseup', (e) => {
      mousedown = false;
    });
  }
  disconfigure(): void {}
}

export const penTool = new PenTool();
