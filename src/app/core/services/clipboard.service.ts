import { Injectable, Renderer2 } from '@angular/core';
import { Layer } from '../layers/layer';
import { DataService } from './data.service';
import { LayerService } from './layer.service';
import { PixelLayer } from '../layers/pixel-layer';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  constructor(
    // private layerService: LayerService,
    private data: DataService
  ) // private renderer: Renderer2
  {}
  copyLayer(layer: Layer) {
    navigator.clipboard.writeText(`layerId=${layer.id}`);
  }
  cutLayer(layer: Layer) {
    navigator.clipboard.writeText(`layerId=${layer.id}`);
    // this.layerService.deleteLayer(layer.id);
  }
  pasteLayer() {
    navigator.clipboard.readText().then((value) => {
      if (value.startsWith('layerId')) {
        const id = value.split('layerId=');
        const layer = this.data.layers.getValue().find((lr) => lr.id == id[1]);
        let copiedLayer: Layer;
        // if (layer instanceof PixelLayer) {
        //   copiedLayer = new PixelLayer(
        //     this.data,
        //     this.renderer,
        //     `${Math.random()}`,
        //     layer?.name + ' Copy',
        //     this.data.selectedProject.getValue()?.Id || '',
        //     layer.src
        //   );

        //   this.data.layers.next([...this.data.layers.getValue(), copiedLayer]);
        // }
      }
    });
  }
  copyLayerSvg(layer: Layer) {
    // const svg = this.layerService.getObjByLayerId(layer.id)?.toSVG();
    // navigator.clipboard.writeText(svg!);
  }
  copyLayerCSS(layer: Layer) {}
  pastLayerStyle(layer: Layer) {}
  copyLayerStyle(layer: Layer) {}
}
