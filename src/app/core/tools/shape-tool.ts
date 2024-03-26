import { Renderer2 } from '@angular/core';
import { Layer } from '../layers/layer';
import { PixelLayer } from '../layers/pixel-layer';
import { Application, ICanvas, Graphics, Container } from 'pixi.js';
import { DataService } from '../services/data.service';
import { Shape } from 'src/app/enums/shapes';
import { Mask } from '..';
export class ShapeTool {
  readonly type: string = 'shapeTool';
  shape: Shape = Shape.Rectangle;
  properties: IShapeToolProperties = {};
  listenForLayerResize!: (e: Event) => void;
  listenForMouseDownEvent!: (e: any) => void;
  mouseUpListener!: (e: any) => void;
  configure(display: HTMLElement, renderer: Renderer2, data: DataService) {
    console.log('shape tool configured');
    const imgDisplay = display.parentElement?.parentElement;
    if (!imgDisplay) {
      return;
    }

    let mousedown = false;
    let shapeLayer: Layer;
    let startX: number, startY: number;
    const imgDisplayRect = display.getBoundingClientRect();

    this.listenForMouseDownEvent = (e: any) => {
      console.log('mousedown');
      const shapeLayers = data.layers
        .getValue()
        .filter((layer) => layer.type == 'shape');

      const clickedShapeLayer = shapeLayers.find((sl) =>
        sl.contains(e.target as HTMLElement)
      );
      if (clickedShapeLayer) {
        return;
      }
      startX = e.clientX - imgDisplayRect.left;
      startY = e.clientY - imgDisplayRect.top;
      mousedown = true;
      shapeLayer = new Layer(
        renderer,
        // display,
        data,
        `${Math.random()}`,
        'Shape Layer 1',
        data.selectedProject.getValue()?.Id || 'aaa'
      );
      shapeLayer.type = 'shape';
      // shapeLayer.setWidth(display.clientWidth);
      // shapeLayer.setHeight(display.clientHeight);

      data.layers.next([...data.layers.getValue(), shapeLayer]);

      renderer.setStyle(
        shapeLayer.elem,
        'background',
        this.properties.fill || '#000'
      );
      renderer.setStyle(
        shapeLayer.elem,
        'border',
        `solid ${this.properties.stroke || ''} ${
          this.properties.strokeWidth || 1
        }`
      );

      let shapeElem: HTMLElement;
      switch (this.shape) {
        case Shape.Rectangle:
          // const mask = new Mask(shapeLayer, [
          //   0,
          //   0,
          //   shapeLayer.elem.clientWidth,
          //   0,
          //   shapeLayer.elem.clientWidth,
          //   shapeLayer.elem.clientHeight,
          //   0,
          //   shapeLayer.elem.clientHeight,
          //   0,
          //   0,
          // ]);

          shapeElem = renderer.createElement('div');
          renderer.addClass(shapeElem, 'shape');

          shapeLayer.elem.appendChild(shapeElem);
          break;
        case Shape.RoundedRectangle:
          shapeElem = renderer.createElement('div');
          renderer.addClass(shapeElem, 'shape');
          renderer.setStyle(
            shapeElem,
            'background',
            data.selectedColors.getValue().fg
          );
          shapeLayer.elem.style.borderRadius = '40px';
          shapeLayer.elem.appendChild(shapeElem);
          break;
      }
    };
    imgDisplay.addEventListener('mousedown', this.listenForMouseDownEvent);

    this.mouseUpListener = (e: any) => {
      mousedown = false;
      data.selectedLayers.next([shapeLayer]);
    };
    document.addEventListener('mouseup', this.mouseUpListener);

    const zoom = data.zoom.getValue() / 100;
    this.listenForLayerResize = (e: any) => {
      if (!mousedown || !shapeLayer) {
        return;
      }
      this.resizeShapeLayer(
        shapeLayer,
        startX,
        startY,
        e,
        imgDisplayRect,
        zoom
      );
    };
    imgDisplay.addEventListener('mousemove', this.listenForLayerResize);
  }
  private resizeShapeLayer(
    shapeLayer: Layer,
    startX: number,
    startY: number,
    e: MouseEvent,
    imgDisplayRect: DOMRect,
    zoom: number
  ) {
    shapeLayer.elem.style.left = `${startX}px`;
    shapeLayer.elem.style.top = `${startY}px`;

    shapeLayer.elem.style.width = `${
      (e.clientX - imgDisplayRect.left) / zoom
    }px`;
    shapeLayer.elem.style.height = `${
      (e.clientY - imgDisplayRect.top) / zoom
    }px`;
  }

  disconfigure(display: HTMLElement): void {
    document.removeEventListener('mousemove', this.listenForLayerResize);
    const imgDisplay = display.parentElement?.parentElement;
    imgDisplay?.removeEventListener('mousedown', this.listenForMouseDownEvent);
    document.removeEventListener('mouseup', this.mouseUpListener);
  }
}

export const shapeTool = new ShapeTool();

interface IShapeToolProperties {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}
