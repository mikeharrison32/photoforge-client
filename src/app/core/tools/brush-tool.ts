import { Brush } from '../brush';
import { MouseDragEvent } from '../event';
import { Layer } from '../layers/layer';
import { PixelLayer } from '../layers/pixel-layer';
import { DataService } from '../services/data.service';
import { NotificationService } from '../services/notification.service';
import * as PIXI from 'pixi.js-legacy';
export class BrushTool {
  type: string = 'brushTool';
  brush?: Brush;
  texture!: PIXI.RenderTexture;
  drawingSurface!: PIXI.Sprite;
  data!: DataService;

  configure(
    display: HTMLElement,
    data: DataService,
    notification: NotificationService
  ) {
    this.data = data;
    let layer: Layer;
    this.brush = new Brush({ size: 30 });
    display.parentElement?.appendChild(this.brush.elem!);
    display.parentElement!.style.cursor = 'none';
    display.style.cursor = 'none';
    const rect = display.parentElement?.parentElement?.getBoundingClientRect();
    document.addEventListener('mousemove', (e) => {
      this.brush?.moveTo(
        e.x - rect!.left - this.brush.elem!.clientWidth / 2,
        e.y - rect!.top - this.brush.elem!.clientHeight / 2
      );
    });

    // data.selectedLayers.subscribe((lr) => {
    //   notification.createNotification({
    //     title: 'Layer Selected ' + lr[0].name || '',
    //     hasCancelBtn: false,
    //     hasOkBtn: false,
    //   });
    //   const firstLayer = lr[0];
    //   if (firstLayer instanceof PixelLayer) {
    //     this.texture = PIXI.RenderTexture.create({
    //       width: firstLayer.app?.view.width,
    //       height: firstLayer.app?.view.height,
    //     });
    //     this.drawingSurface = new PIXI.Sprite(this.texture);

    //     const brush = new PIXI.Graphics().beginFill('black');

    //     const lineFill = new PIXI.Graphics();
    //     const prevPosition = new PIXI.Point();
    //   }
    // });
    display.addEventListener('mousedown', (e) => {
      if (!layer) {
        notification.createNotification({
          title: 'Please select a layer to draw on.',
          hasCancelBtn: false,
          hasOkBtn: false,
        });
        return;
      }
    });
  }
  disconfigure(): void {
    this.brush?.elem?.remove();
    delete this.brush;
  }
}

export const brushTool = new BrushTool();
