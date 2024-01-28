import { MouseDragEvent } from "../event";
import { PixelLayer } from "../layers/pixel-layer";

export class EraserTool {
  properties?: IEraserToolProperties 
  configure(display: HTMLElement, layer: PixelLayer) {
    new MouseDragEvent(display, true,(e: any) => {
      this.erase(layer,e.x,  e.y, this.properties?.size || 3)
    })
  }
  erase(layer: PixelLayer, x: any, y: any, size: number ) {
    // const ctx =  layer.ctx
    // ctx?.putImageData(new ImageData(size, size), x, y)
  }

  disconfigure(): void {}
}

interface IEraserToolProperties {
  size?: number
  mode?: string
}