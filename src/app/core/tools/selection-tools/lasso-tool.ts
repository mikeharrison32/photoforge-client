import { PixelLayer } from "src/app/core/layers/pixel-layer";
import { MouseDragEvent } from "../../event";
import { Canvas } from "../../canvas";

export class LassoTool {
  lassoCanvas?: Canvas
  type: string = "lassoTool"
  configure(display: HTMLElement, layer: PixelLayer) {
    console.log("lasso tool configured.")
    this.lassoCanvas = new Canvas({
      width: display.clientWidth,
      height: display.clientHeight,
      x: 0,
      y: 0,
      position: "absolute"
    })
    display.appendChild(this.lassoCanvas.elem!)
    const ctx = this.lassoCanvas.getContext("2d") as CanvasRenderingContext2D

    this.lassoCanvas.elem?.addEventListener("mousedown", e => {
      ctx.clearRect(0, 0, this.lassoCanvas!.elem!.clientWidth, this.lassoCanvas!.elem!.clientHeight)
      ctx.moveTo(e.x - lassoRect!.left,e.y - lassoRect!.top)
    })
    ctx.beginPath()
    ctx.lineWidth = 10
    ctx.lineCap = "round"
    ctx.lineJoin = "miter"
    ctx.strokeStyle = "rgb(255, 255, 155)"
    const lassoRect = this.lassoCanvas.elem?.getBoundingClientRect()
    let scale = parseFloat(display.style.scale || "1")
    new MouseDragEvent(this.lassoCanvas.elem!, true,(e: any) => {
      ctx.lineTo((e.x * 2) / scale, (e.y * 2) /  scale)
      ctx.stroke()
    })
  }

  disconfigure(): void {}
}

export const lassoTool = new LassoTool()