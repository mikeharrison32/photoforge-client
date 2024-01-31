import { Canvas } from '../../canvas';
import { ContextMenu, Menu } from '../../context-menu';
import { MouseDragEvent } from '../../event';
import { Layer } from '../../layers/layer';
import { PixelLayer } from '../../layers/pixel-layer';
import { DataService } from '../../services/data.service';

class ReactangularSelect {
  properites?: IRectangularProperties;
  contextMenu?: ContextMenu;
  type: string = 'rectangularSelectTool';
  rectCanvas?: Canvas;
  configure(
    display: HTMLElement,
    selectedLayer: PixelLayer,
    data: DataService
  ): void {
    this.rectCanvas = new Canvas({
      width: display.clientWidth,
      height: display.clientHeight,
      position: 'absolute',
      x: 0,
      y: 0,
    });
    const ctx = this.rectCanvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.lineWidth = 10;
    new MouseDragEvent(this.rectCanvas.elem!, false, (e: any) => {
      ctx.fillStyle = data.selectedColors.getValue().fg;
      const displayScale = parseFloat(display.style.scale || '1');
      const rect = this.rectCanvas?.elem?.getBoundingClientRect();
      const x = ((e.x - rect!.left) * 2) / displayScale;
      const y = ((e.y - rect!.top) * 2) / displayScale;
      ctx.fillRect(x, y, 300, 400);
    });

    // this.setUpContextMenu(display, 0, 0, )
    display.appendChild(this.rectCanvas.elem as any);
  }
  applySelection() {}
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
    this.rectCanvas?.elem?.remove();
    delete this.rectCanvas;
    delete this.contextMenu;
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
