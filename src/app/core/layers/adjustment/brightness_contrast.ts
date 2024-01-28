import {  drawImage } from 'src/app/utils/webglUtils';
import { PixelLayer } from '../pixel-layer';
import { AdjustmentLayer } from './adjustment_layer';
import { applyBrightnees, applyContrast } from '../../filters';

export class BrightnessContrastAdjustmentLayer extends AdjustmentLayer {
  brightness: number = 0;
  id!: string
  contrast: number = 0;

  constructor(
    pl: PixelLayer,
    name: string,
    options?: IBrightnessContrastAdjustmentLayerOptions
  ) {
    super(pl);
    this.name = name;
    this.id = `${Math.random()}`    
    this.type = 'brightnessContrast';
    if (options) {
      this.brightness = options.brightness;
      this.contrast = options.contrast;
      const gl = this.pl?.gl
      if(!gl){return}
      applyBrightnees(gl, this.pl?.img,options.brightness)
      applyContrast(gl, this.pl?.img,options.contrast)

    }
  }

  hide() {
    const gl = this.pl?.gl
    if(!gl){return}
    drawImage(gl,this.pl?.img)
  }
  set(options: IBrightnessContrastAdjustmentLayerOptions) {
    const gl = this.pl?.gl
    if(!gl){return}
    applyBrightnees(gl, this.pl?.img,options.brightness)
    applyContrast(gl, this.pl?.img,options.contrast)

  }
  override show() {
    const gl = this.pl?.gl
    if(!gl){return}
    applyBrightnees(gl, this.pl?.img,this.brightness)
    applyBrightnees(gl, this.pl?.img,this.contrast)


  }
  clear() {}
}

interface IBrightnessContrastAdjustmentLayerOptions {
  brightness: number;
  contrast: number;
}
