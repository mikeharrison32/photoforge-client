import { Renderer2 } from '@angular/core';
import { Layer } from '../layers/layer';
import { PixelLayer } from '../layers/pixel-layer';
import { Application, ICanvas, Graphics, Container } from 'pixi.js';
import { DataService } from '../services/data.service';
import { Shape } from 'src/app/enums/shapes';
import { Mask } from '..';
export class ShapeTool {
  type: string = 'shapeTool';
  shape: Shape = Shape.Rectangle;
  configure(display: HTMLElement, renderer: Renderer2, data: DataService) {
    const imgDisplay = display.parentElement?.parentElement;
    if (!imgDisplay) {
      return;
    }

    let mousedown = false;
    let shapeLayer: Layer;
    let startX: number, startY: number;
    const imgDisplayRect = display.getBoundingClientRect();

    imgDisplay.addEventListener('mousedown', (e) => {
      const shapeLayers = data.layers
        .getValue()
        .filter((layer) => layer.type == 'shapeLayer');

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
        display,
        data,
        `${Math.random()}`,
        'Shape Layer 1',
        data.selectedProject.getValue()?.Id || 'aaa'
      );
      shapeLayer.type = 'shapeLayer';
      // shapeLayer.setWidth(display.clientWidth);
      // shapeLayer.setHeight(display.clientHeight);

      data.layers.next([...data.layers.getValue(), shapeLayer]);

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

          const shapeElem = renderer.createElement('div');
          renderer.addClass(shapeElem, 'shape');
          renderer.setStyle(
            shapeElem,
            'background',
            data.selectedColors.getValue().fg
          );
          shapeLayer.elem.appendChild(shapeElem);
          break;
      }
    });
    document.addEventListener('mouseup', (e) => {
      mousedown = false;
      data.selectedLayers.next([shapeLayer]);
    });

    const zoom = data.zoom.getValue() / 100;
    imgDisplay.addEventListener('mousemove', (e) => {
      if (!mousedown || !shapeLayer) {
        return;
      }
      shapeLayer.elem.style.left = `${startX}px`;
      shapeLayer.elem.style.top = `${startY}px`;

      shapeLayer.elem.style.width = `${
        (e.clientX - imgDisplayRect.left) / zoom
      }px`;
      shapeLayer.elem.style.height = `${
        (e.clientY - imgDisplayRect.top) / zoom
      }px`;
    });
  }
  disconfigure(): void {}
}

export const shapeTool = new ShapeTool();
