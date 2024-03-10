import { NgZone } from '@angular/core';
import { PixelLayer } from '../pixel-layer';

export class AdjustmentLayer {
  pl?: PixelLayer;
  type?: string;
  name?: string;
  visible: boolean = true;
  constructor(pl: PixelLayer) {
    this.pl = pl;
  }
  clearAllFilters() {
    if (this.pl!.adjustmentLayers.length < 1) {
      return;
    }
    // let canvas = this.pl?.ctx?.canvas;
    // this.pl?.ctx?.clearRect(0, 0, canvas!.width, canvas!.height);
    // const img = this.pl?.img;
    // this.pl?.ctx?.drawImage(
    //   img,
    //   0,
    //   0,
    //   img.width * this.pl.scale,
    //   img.height * this.pl.scale
    // );
  }
  showAllFilters() {
    // this.pl?.adjustmentLayers.forEach((aj_layer) => {
    //   aj_layer.show();
    // });
  }
  show(ngZone?: NgZone) {}
  hide(ngZone?: NgZone) {}
}
