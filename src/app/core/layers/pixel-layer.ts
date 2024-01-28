import { hueRotate } from '../filters/hue-rotate';
import { rgbaFormatter } from '../rgba-formater';
import { Layer } from './layer';
import { IColorRGBA } from 'src/app/types/color';
import { vibrance } from '../filters/vibrance';
import { AdjustmentLayer } from './adjustment/adjustment_layer';
import { BrightnessContrastAdjustmentLayer } from './adjustment/brightness_contrast';
import { drawImage } from 'src/app/utils/webglUtils';
export class PixelLayer extends Layer {
  pixels: IColorRGBA[] = [];
  src?: string;
  adjustmentLayers: AdjustmentLayer[] = [];
  img: any;
  gl?: WebGLRenderingContext | WebGL2RenderingContext | null 
  constructor(
    containerElem: HTMLElement | null,
    id: string,
    name: string,
    projectId: string,
    img: any | ImageData
  ) {
    super(containerElem, id, name, projectId, true);
    this.type = 'pixel';
    this.setWidth(img.width);
    this.setHeight(img.height);
    if (img instanceof ImageData) {
      // this.ctx?.putImageData(img, 0, 0);
    } else {
      this.src = img.src;
      this.img = img;
      this.gl = (this.canvas as HTMLCanvasElement).getContext("webgl") || (this.canvas as HTMLCanvasElement).getContext("webgl2")
      if(!this.gl){
        console.error("couldn't get webGL context at pixel-layer")
        return
      }


      // const program = createProgram(gl, )
      drawImage(this.gl, img)
    }
  }
}


