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
  createTypeLayer(text?: string, projectId?: string) {
    // const displayElem = this.data.displayElem.getValue();
    // let lastIndex =
    //   this.data.layers.getValue().filter((lr) => lr instanceof TypeLayer)
    //     .length + 1;
    // const textLayer = new TypeLayer(
    //   this.renderer,
    //   displayElem!,
    //   `${Math.random()}`,
    //   'Type layer ' + lastIndex,
    //   this.data.selectedProject.getValue()?.Id || projectId || 'aaa',
    //   text
    // );
    // this.data.layers.next([...this.data.layers.getValue(), textLayer]);
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
