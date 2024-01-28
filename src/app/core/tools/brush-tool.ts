import { MouseDragEvent } from '../event';
import { Layer } from '../layers/layer';

export class BrushTool {
  type: string = 'brushTool';
  configure(layer: Layer) {
    console.log('layer', layer);
    if (layer) {
      // const ctx = layer.ctx;
      // ctx!.lineWidth = 100;
      // ctx?.beginPath();
      // ctx?.moveTo(10, 10);
      console.log('path begun.');
      layer.locked = true;
      const display = document.getElementById('display');
      const displayScale = parseFloat(display?.style.scale || '1');
      const rect = layer.canvas?.getBoundingClientRect();
      // new MouseDragEvent(
      //   document.getElementById('image-display')!,
      //   (e: any) => {
      //     // ctx?.clearRect(
      //     //   ((e.x - rect!.left) * layer.scale) / displayScale,
      //     //   ((e.y - rect!.top) * layer.scale) / displayScale,
      //     //   100 * layer.scale,
      //     //   100 * layer.scale
      //     // );
      //   }
      // );
    }
  }
  disconfigure(): void {}
}

export const brushTool = new BrushTool();
