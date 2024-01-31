import { Brush } from '../brush';
import { MouseDragEvent } from '../event';
import { Layer } from '../layers/layer';
import { DataService } from '../services/data.service';
import { NotificationService } from '../services/notification.service';

export class BrushTool {
  type: string = 'brushTool';
  brush?: Brush;

  configure(
    display: HTMLElement,
    data: DataService,
    notification: NotificationService
  ) {
    let layer: Layer;
    this.brush = new Brush({ size: 30 });
    display.parentElement?.appendChild(this.brush.elem!);
    display.parentElement!.style.cursor = 'none';
    const rect = display.parentElement?.getBoundingClientRect();
    document.addEventListener('mousemove', (e) => {
      this.brush?.moveTo(e.x - rect!.left, e.y - rect!.top);
    });
    display.addEventListener('mousedown', (e) => {
      layer = data.selectedLayers.getValue()[0];
      if (!layer) {
        notification.createNotification({
          title: 'Please select a layer to draw on.',
          mainTextColor: 'red',
        });
      }
    });
  }
  disconfigure(): void {
    this.brush?.elem?.remove();
    delete this.brush;
  }
}

export const brushTool = new BrushTool();
