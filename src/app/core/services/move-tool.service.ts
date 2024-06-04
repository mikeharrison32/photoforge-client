import { Injectable, Renderer2 } from '@angular/core';
import { Layer } from '../layers/layer';
import { DataService } from './data.service';
import { ToolService } from './tool.service';

@Injectable({
  providedIn: 'root',
})
export class MoveToolService {
  private mouseDownListenter?: () => void;
  private mouseUpListenter?: () => void;
  private mouseMoveListenter?: () => void;
  constructor(private data: DataService, private toolService: ToolService) {}
  configure(display: HTMLElement, renderer: Renderer2) {
    this.toolService.disconfigureTools();
    let mousedown = false;
    let rect: DOMRect;
    let zoom: number;
    let layerToMove: Layer;
    let startX = 0;
    let startY = 0;
    let initialX = 0;
    let initialY = 0;
    this.mouseDownListenter = renderer.listen(display, 'mousedown', (e) => {
      mousedown = true;
      rect = display.getBoundingClientRect();
      zoom = this.data.zoom.getValue() / 100;
      const layers = this.data.layers.getValue();

      for (let i = 0; i < layers.length; i++) {
        const layer = layers[i];
        if (layer.contains(e.target)) {
          layerToMove = layer;
        }
      }
      startX = e.clientX - initialX;
      startY = e.clientY - initialY;
    });
    this.mouseUpListenter = renderer.listen(document, 'mouseup', (e) => {
      mousedown = false;
    });
    this.mouseMoveListenter = renderer.listen(document, 'mousemove', (e) => {
      if (!mousedown) {
        return;
      }
      const x = (e.clientX - startX - rect.left) / zoom;
      const y = (e.clientY - startY - rect.top) / zoom;

      if (!layerToMove) {
        return;
      }
      initialX = e.clientX - startX;
      initialY = e.clientY - startY;

      layerToMove.moveTo(initialX / zoom, initialY / zoom);
    });
  }
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
  centerSelectedObjVertical() {
    const selectedLayers = this.data.selectedLayers.getValue();
    selectedLayers.forEach((layer) => {
      const display = this.data.displayElem.getValue();
      layer.moveTo(
        layer.x,
        display!.clientHeight / 2 - layer.elem.clientHeight / 2
      );
    });
  }
  centerSelectedObjHorizontal() {
    const selectedLayers = this.data.selectedLayers.getValue();

    selectedLayers.forEach((layer) => {
      const display = this.data.displayElem.getValue();

      layer.moveTo(
        display!.clientWidth / 2 - layer.elem.clientWidth / 2,
        layer.y
      );
    });
  }
  alignTop() {
    const selectedLayers = this.data.selectedLayers.getValue();

    selectedLayers.forEach((layer) => {
      layer.moveTo(layer.x, 0);
    });
  }
  alignLeft() {
    const selectedLayers = this.data.selectedLayers.getValue();

    selectedLayers.forEach((layer) => {
      layer.moveTo(0, layer.y);
    });
  }
  alignRight() {
    const selectedLayers = this.data.selectedLayers.getValue();

    selectedLayers.forEach((layer) => {
      const display = this.data.displayElem.getValue();
      // layer.elem.style.left =
      // display!.clientWidth - layer.elem.clientWidth + 'px';
    });
  }
  alignBottom() {
    const display = this.data.displayElem.getValue();
    const selectedLayers = this.data.selectedLayers.getValue();

    selectedLayers.forEach((layer) => {
      layer.moveTo(
        layer.x,

        display!.clientHeight - layer.elem.clientHeight
      );
    });
  }
}
