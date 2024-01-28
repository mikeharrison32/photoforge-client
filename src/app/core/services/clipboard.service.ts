import { Injectable } from '@angular/core';
import { Layer } from '../layers/layer';
import { DataService } from './data.service';
import { LayerService } from './layer.service';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  constructor(private layerService: LayerService, private data: DataService) {}
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
        // const layer = this.layerService.findLayer(id[1]);
        // this.data.layers.next([
        //   ...this.data.layers.getValue(),
        //   { ...layer!, id: `${Math.random()}` },
        // ]);
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
