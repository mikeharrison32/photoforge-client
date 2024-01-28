import { PixelLayer } from "../layers/pixel-layer";
import {Application, ICanvas, Graphics, Container} from "pixi.js"
export class ShapeTool {
  type: string = "shapeTool"
  configure(display: HTMLElement, layer: PixelLayer) {
    const app = new Application({
      view: layer!.canvas as ICanvas
    })

    const graphics = new Graphics();
    graphics.drawRect(10, 10, 400, 400)
    
    app.stage.addChild(graphics)
    
  }
  disconfigure(): void {}
}

export const shapeTool = new ShapeTool()