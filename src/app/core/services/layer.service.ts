import {
  Injectable,
  OnDestroy,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';
import { DataService } from './data.service';
import { Layer } from '../layers/layer';
import { PixelLayer } from '../layers/pixel-layer';
import { TypeLayer } from '../layers/type-layer';
@Injectable({
  providedIn: 'root',
})
export class LayerService {
  constructor(private data: DataService) {}
  deleteSelectedLayers() {
    const newLayersArray: Layer[] = [];
    this.data.layers.getValue().forEach((layer) => {
      if (this.data.selectedLayers.getValue().includes(layer)) {
        layer.remove();
      } else {
        newLayersArray.push(layer);
      }
    });
    this.data.layers.next(newLayersArray);
  }
  createLayerObj(renderer: Renderer2, layer: any, blob: Blob) {
    const reader = new FileReader();
    let promise = new Promise((resolve, reject) => {
      reader.onload = (e) => {
        const img = new Image();

        img.onload = () => {
          const p_layer = new PixelLayer(
            this.data,
            renderer,
            layer.id,
            layer.name,
            layer.projectId
          );
          p_layer.insertImage(img);
          this.data.layers.next([...this.data.layers.getValue(), p_layer]);
          resolve(p_layer);
        };
        img.crossOrigin = '';
        img.src = e.target!.result as string;
      };
      reader.readAsDataURL(blob);
    });
    return promise;
  }
  newLayer(renderer: Renderer2) {
    const layer = new PixelLayer(
      this.data,
      renderer,
      `${Math.random()}`,
      'Layer 1',
      this.data.openedProject.getValue()?.Id || ''
    );
    this.data.layers.next([...this.data.layers.getValue(), layer]);
  }
  duplicateLayer(renderer: Renderer2, layer: Layer) {
    if (layer instanceof PixelLayer) {
      const displayElem = this.data.displayElem.getValue();
      const img = new Image();
      img.src = layer.src || '';
      img.onload = () => {
        const newLayer = new PixelLayer(
          this.data,
          renderer,
          // displayElem,
          `${Math.random()}`,
          layer.name + ' Copy',
          layer.projectId
        );

        this.data.layers.next([...this.data.layers.getValue(), newLayer]);
      };
    } else if (layer instanceof TypeLayer) {
    }
  }
}
