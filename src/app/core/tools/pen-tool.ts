import { PixelLayer } from "../layers/pixel-layer";

export class PenTool {
  configure(display: HTMLElement, layer: PixelLayer): void {
      display.addEventListener("mousedown", e => {
      })
      display.addEventListener("mousemove", e => {})
      display.addEventListener("mouseup", e => {})
  }
 disconfigure(): void {}
}
