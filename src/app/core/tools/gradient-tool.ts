import { MouseDragEvent } from "../event";
import { PixelLayer } from "../layers/pixel-layer";

export class GradientTool {
  properties?: IGradientToolProperties 
  configure(display: HTMLElement, layer: PixelLayer) {
    // const ctx = layer.ctx
    const gradient = new CanvasGradient()
    this.properties?.colorStops?.forEach(stop => {
      gradient.addColorStop(stop.offset, stop.color)
    })
    // ctx!.fillStyle = gradient
    // new MouseDragEvent(display, true,(e: any) => {
    
    // })
  }
 
  disconfigure(): void {}
}

interface IGradientToolProperties {
  type?: "linear" | "radial" | "angle"
  mode?: string
  colorStops?: {offset: number, color: string}[]
  opacity?: number
  reverse?: boolean
  dither?: boolean
  transparency?: boolean
}