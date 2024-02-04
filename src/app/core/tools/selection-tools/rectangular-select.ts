import { Canvas } from '../../canvas';
import { ContextMenu, Menu } from '../../context-menu';
import { MouseDragEvent } from '../../event';
import { Layer } from '../../layers/layer';
import { PixelLayer } from '../../layers/pixel-layer';
import { DataService } from '../../services/data.service';
import { fabric } from 'fabric';
import * as PIXI from 'pixi.js-legacy';
import { AdjustmentFilter } from '@pixi/filter-adjustment';
class ReactangularSelect {
  properites?: IRectangularProperties;
  contextMenu?: ContextMenu;
  type: string = 'rectangularSelectTool';
  canvas?: fabric.Canvas;
  selectionRect?: PIXI.Rectangle;
  configure(
    display: HTMLElement,
    selectedLayer: PixelLayer,
    data: DataService
  ): void {
    const app = new PIXI.Application({
      width: display.clientWidth,
      height: display.clientHeight,
      background: 'transparent',
      backgroundColor: 'transparent',
      backgroundAlpha: 0,
    });
    let selectionRectStart = {
      x: 0,
      y: 0,
    };

    display.addEventListener('mousedown', (e) => {
      const displayScale = parseFloat(display.style.scale || '1');
      if (this.selectionRect) {
      }
      const graphics = new PIXI.Graphics();
      graphics.beginFill(0xff0000, 1);
      graphics.drawRect(0, 0, 200, 100);
      graphics.endFill();
      app.stage.addChild(graphics);
      // selectionRectStart = {
      //   x: (e.clientX - canvasRect.left) / displayScale,
      //   y: (e.clientY - canvasRect.top) / displayScale,
      // };
    });

    display.appendChild(app.view as any);
    new MouseDragEvent(display, false, (e: any) => {
      const displayScale = parseFloat(display.style.scale || '1');

      const canvasRect = this.canvas!.getElement().getBoundingClientRect();
      if (!this.selectionRect) {
        return;
      }
      // this.selectionRect.left = selectionRectStart.x;
      // this.selectionRect.top = selectionRectStart.y;

      this.selectionRect.width = (e.x - canvasRect.left) / displayScale;
      this.selectionRect.height = (e.y - canvasRect.top) / displayScale;
      this.canvas?.renderAll();
    });

    document.addEventListener('keydown', (e) => {
      if (e.code == 'Enter') {
        this.applySelection();
      }
    });
  }
  applySelection() {
    // // const rect = this.selectionRect?.getBoundingRect();
    // if (!rect) {
    //   return;
    // }
    // const line = new fabric.Line(
    //   [rect.left, rect.top, rect.left, rect.height],
    //   {
    //     stroke: 'red',
    //     strokeWidth: 10,
    //   }
    // );
    // this.canvas?.add(line);
    // this.canvas?.remove(this.selectionRect!);
  }
  setUpContextMenu(
    display: HTMLElement,
    x: number,
    y: number,
    rect: HTMLElement,
    selectedLayer: Layer,
    data: DataService
  ) {
    this.contextMenu = new ContextMenu(
      display,
      x - rect.getBoundingClientRect().left,
      y - rect.getBoundingClientRect().top
    );
    const layerViaCopy = new Menu('Layer Via Copy');
    layerViaCopy.onClick(() => {
      const new_layer_imgdata = selectedLayer.ctx?.getImageData(
        rect.clientLeft,
        rect.clientTop,
        rect.clientWidth,
        rect.clientHeight
      );
      const layer = new PixelLayer(
        display,
        `${Math.random()}`,
        'Layer 1',
        'aaa',
        new_layer_imgdata
      );
      data.layers.next([...data.layers.getValue(), layer]);
    });
    const layerViaCut = new Menu('Layer Via Cut');
    layerViaCut.onClick(() => {
      const new_layer_imgdata = selectedLayer.ctx?.getImageData(
        rect.clientLeft,
        rect.clientTop,
        rect.clientWidth,
        rect.clientHeight
      );
      const layer = new PixelLayer(
        display,
        `${Math.random()}`,
        'Layer 1',
        'aaa',
        new_layer_imgdata
      );
      data.layers.next([...data.layers.getValue(), layer]);

      selectedLayer.ctx?.putImageData(
        new ImageData(rect.clientWidth, rect.clientHeight),
        rect.clientLeft,
        rect.clientTop
      );
    });
    this.contextMenu.addMenus(layerViaCopy, layerViaCut);
  }
  disconfigure(display: HTMLElement): void {
    this.canvas?.getElement()?.remove();
    delete this.canvas;
  }
}

interface IRectangularProperties {
  feather?: number;
  antiAlias?: boolean;
  style?: string;
  width?: number;
  height?: number;
}

export const rectangularSelect = new ReactangularSelect();
