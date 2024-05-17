import { Layer } from '../layers/layer';
import { Selection } from '../selection';
import { DataService } from '../services/data.service';

class MoveTool {
  readonly type: string = 'moveTool';
  mouseDownListener!: (e: any) => void;
  mouseMoveListener!: (e: any) => void;
  mouseUpListener!: (e: any) => void;

  configure(display: HTMLElement, data: DataService): void {
    let layerToMove: Layer | undefined;
    let mousedown = false;
    let rect: DOMRect;
    let zoom: number;
    let movingAllowed: boolean = data.isMovingAllowed.getValue();

    this.mouseDownListener = (e: any) => {
      rect = display.getBoundingClientRect();
      zoom = data.zoom.getValue() / 100;
      const layers = data.layers.getValue();
      const selection = data.currentSelection.getValue();
      layerToMove = layers.find((layer) =>
        layer.contains(e.target as HTMLElement)
      );
      if (layerToMove) {
        mousedown = true;
      }
    };
    this.mouseMoveListener = (e: any) => {
      if (!mousedown || !movingAllowed) {
        return;
      }
      if (layerToMove && !layerToMove.locked) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        layerToMove.moveTo(x / zoom, y / zoom);
      }
    };
    this.mouseUpListener = (e: any) => {
      mousedown = false;
    };
    document.addEventListener('mousedown', this.mouseDownListener);
    document.addEventListener('mousemove', this.mouseMoveListener);
    document.addEventListener('mouseup', this.mouseUpListener);
  }
  disconfigure(): void {
    document.removeEventListener('mousedown', this.mouseDownListener);
    document.removeEventListener('mousemove', this.mouseMoveListener);
    document.removeEventListener('mouseup', this.mouseUpListener);
  }
}

export const moveTool = new MoveTool();
