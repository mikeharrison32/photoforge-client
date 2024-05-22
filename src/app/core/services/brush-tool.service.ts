import { Injectable, Renderer2 } from '@angular/core';
import { DataService } from './data.service';
import { PixelLayer } from '../layers/pixel-layer';

@Injectable({
  providedIn: 'root',
})
export class BrushToolService {
  private mouseDownListenter?: () => void;
  private mouseUpListenter?: () => void;
  private mouseMoveListenter?: () => void;
  constructor(private data: DataService) {}
  disconfigure() {
    if (this.mouseDownListenter) {
      this.mouseDownListenter();
    }
    if (this.mouseMoveListenter) {
      this.mouseMoveListenter();
    }
    if (this.mouseUpListenter) {
      this.mouseUpListenter();
    }
  }
  configure(display: HTMLElement, renderer: Renderer2) {
    let mousedown = false;
    let rect: DOMRect;
    let zoom: number;
    let layer: PixelLayer;
    let ctx: CanvasRenderingContext2D;

    this.mouseDownListenter = renderer.listen(
      display,
      'mousedown',
      (e: any) => {
        mousedown = true;
        rect = display.getBoundingClientRect();
        zoom = this.data.zoom.getValue() / 100;
        const layers = this.data.layers.getValue();
        const selectedLayers = this.data.selectedLayers.getValue();
        if (
          selectedLayers.length > 0 &&
          selectedLayers[0] instanceof PixelLayer
        ) {
          layer = selectedLayers[0];
          layer.get2DContext().then((c) => {
            ctx = c;
          });
          return;
        }

        if (layers[0] instanceof PixelLayer) {
          layer = layers[0];
          layer.get2DContext().then((c) => {
            ctx = c;
          });
        }
      }
    );
    this.mouseUpListenter = renderer.listen(document, 'mouseup', (e) => {
      mousedown = false;
    });
    this.mouseMoveListenter = renderer.listen(document, 'mousemove', (e) => {
      if (!mousedown) {
        return;
      }
      const x = (e.clientX - rect.left) / zoom;
      const y = (e.clientY - rect.top) / zoom;

      if (!layer) {
        return;
      }

      ctx.fillRect(x, y, 200, 200);
    });
  }
}
