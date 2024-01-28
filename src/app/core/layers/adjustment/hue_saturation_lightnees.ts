import {  drawImage } from 'src/app/utils/webglUtils';
import { PixelLayer } from '../pixel-layer';
import { AdjustmentLayer } from './adjustment_layer';
import { applyBrightnees, applyContrast } from '../../filters';

export class HueSaturationLightnees extends AdjustmentLayer {
  id!: string
  hue: number = 0;
  saturation: number = 0;
  lightnees: number = 0;

  constructor(
    pl: PixelLayer,
    name: string,
    options?: IHueSaturationLightneesOptions
  ) {
    super(pl);
    this.name = name;
    this.id = `${Math.random()}`    
    this.type = 'hueSaturationLightnees';
    if (options) {
      this.hue = options.hue;
      this.saturation = options.saturation;
      this.lightnees = options.lightnees;

      const gl = this.pl?.gl
      if(!gl){return}


    }
  }

  hide() {
    const gl = this.pl?.gl
    if(!gl){return}
    drawImage(gl,this.pl?.img)
  }
  set(options: IHueSaturationLightneesOptions) {
    const gl = this.pl?.gl
    if(!gl){return}


  }
  override show() {
    const gl = this.pl?.gl
    if(!gl){return}

  }
  clear() {}
}

interface IHueSaturationLightneesOptions {
  hue: number;
  saturation: number;
  lightnees: number;
}
