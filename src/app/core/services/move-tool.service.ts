import { Injectable } from '@angular/core';
import { Layer } from '../layers/layer';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class MoveToolService {
  constructor(private data: DataService) {}
  centerSelectedObjVertical() {
    const selectedLayers = this.data.selectedLayers.getValue();
    selectedLayers.forEach((layer) => {
      const display = this.data.displayElem.getValue();
      layer.elem.style.top =
        display!.clientHeight / 2 - layer.elem.clientHeight / 2 + 'px';
    });
  }
  centerSelectedObjHorizontal() {
    const selectedLayers = this.data.selectedLayers.getValue();

    selectedLayers.forEach((layer) => {
      const display = this.data.displayElem.getValue();

      layer.elem.style.left =
        display!.clientWidth / 2 - layer.elem.clientWidth / 2 + 'px';
    });
  }
  alignTop() {
    const selectedLayers = this.data.selectedLayers.getValue();

    selectedLayers.forEach((layer) => {
      layer.elem.style.top = '0px';
    });
  }
  alignLeft() {
    const selectedLayers = this.data.selectedLayers.getValue();

    selectedLayers.forEach((layer) => {
      layer.elem.style.left = '0px';
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
      layer.elem.style.top =
        display!.clientHeight - layer.elem.clientHeight + 'px';
    });
  }
}
