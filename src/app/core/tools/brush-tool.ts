import { Renderer2 } from '@angular/core';
import { Mask } from '..';
import { Brush } from '../brush';
import { MouseDragEvent } from '../event';
import { Layer } from '../layers/layer';
import { PixelLayer } from '../layers/pixel-layer';
import { PfObject } from '../pf-object';
import { DataService } from '../services/data.service';
import { NotificationService } from '../services/notification.service';
import * as PIXI from 'pixi.js-legacy';
export class BrushTool {
  type: string = 'brushTool';
  brush?: Brush;
  texture!: PIXI.RenderTexture;
  drawingSurface!: PIXI.Sprite;
  data!: DataService;
  display!: HTMLElement;

  configure(
    display: HTMLElement,
    data: DataService,
    notification: NotificationService,
    renderer: Renderer2
  ) {
    this.data = data;
    this.brush = new Brush({ size: 30 });
    this.display = display;
    display.parentElement!.parentElement!.style.cursor = 'none';
    display.parentElement?.parentElement?.appendChild(this.brush.elem!);
    display.parentElement!.style.cursor = 'none';
    display.style.cursor = 'none';
    const rect = display.parentElement?.parentElement?.getBoundingClientRect();
    let mousedown = false;
    document.addEventListener('mouseup', (e) => {
      mousedown = false;
    });
    let drawingSurface = document.createElement('div');
    drawingSurface.classList.add('drawing');
    const layer = new Layer(
      renderer,
      display,
      data,
      `${Math.random()}`,
      'Layer Drawing',
      data.selectedProject.getValue()?.Id || 'aaa'
    );
    layer.elem.style.width = `${display.clientWidth}px`;
    layer.elem.style.height = `${display.clientHeight}px`;
    layer.elem.appendChild(drawingSurface);
    data.layers.next([...data.layers.getValue(), layer]);
    const mask = new Mask(layer);
    display.parentElement?.parentElement!.addEventListener('mousedown', (e) => {
      console.log('br');
      mousedown = true;
    });
    document.addEventListener('mousemove', (e) => {
      this.brush?.moveTo(
        e.x - rect!.left - this.brush.elem!.clientWidth / 2,
        e.y - rect!.top - this.brush.elem!.clientHeight / 2
      );
      if (!mousedown) {
        return;
      }

      const colors = data.selectedColors.getValue();
      drawingSurface.style.background = `${colors.fg}`;
      const layerRect = display.getBoundingClientRect();
      const zoom = data.zoom.getValue() / 100;
      mask.reveal(
        (e.clientX - layerRect.left) / zoom,
        (e.clientY - layerRect.top) / zoom,
        30
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
    this.brush?.destroy();

    document.removeEventListener('mousemove', () => {});
    delete this.brush;
  }
}

export const brushTool = new BrushTool();
