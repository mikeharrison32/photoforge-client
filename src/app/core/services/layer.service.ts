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
