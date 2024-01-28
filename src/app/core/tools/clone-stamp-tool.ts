import { Brush } from "../brush";
import { MouseDragEvent } from "../event";
import { PixelLayer } from "../layers/pixel-layer";

export class CloneStampTool {
  type: string = "cloneStampTool"
  brush?: Brush
  configure(display: HTMLElement, layer: PixelLayer) {
    this.brush = new Brush({size: 30})
    display.parentElement?.appendChild(this.brush.elem!)
    display.parentElement!.style.cursor = "none"
    const rect = display.parentElement?.getBoundingClientRect()
    document.addEventListener("mousemove", e => {
      this.brush?.moveTo(e.x - rect!.left, e.y - rect!.top)
    })
  }

  disconfigure(display: HTMLElement): void {
    this.brush?.elem?.remove()
    display.parentElement!.style.cursor = "default"
  }
}


export const cloneStampTool = new CloneStampTool()