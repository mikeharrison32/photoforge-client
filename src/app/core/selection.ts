import * as PIXI from 'pixi.js-legacy';
interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class Selection {
  app?: PIXI.Application;
  texture: PIXI.RenderTexture | undefined;
  constructor(canvas: HTMLCanvasElement | PIXI.Application, points?: number[]) {
    if (canvas instanceof HTMLCanvasElement) {
    } else if (canvas instanceof PIXI.Application) {
      this.app = canvas;
      this.texture = PIXI.RenderTexture.create({
        width: this.app?.view.width,
        height: this.app?.view.height,
      });
      if (!points) {
        return;
      }
      this.addFromPoints(points);
    }
  }
  show() {}
  clear() {}
  intersect(sl: Selection) {}
  subtract(sl: Selection) {}
  addFromPoints(points: number[]) {
    let color = 'black';
    const prevPosition = new PIXI.Point();
    const lineFill = new PIXI.Graphics().beginFill('black');
    const brush = new PIXI.Graphics().beginFill('black');
    const redraw = (x: number, y: number) => {
      color = color == 'black' ? 'white' : 'black';
      brush.position.set(x, y);
      this.app?.renderer.render(brush, {
        renderTexture: this.texture,
        clear: false,
      });
      lineFill
        .clear()
        .lineStyle(2, color)
        .moveTo(prevPosition.x, prevPosition.y)
        .lineTo(brush.x, brush.y);
      this.app?.renderer.render(lineFill, {
        renderTexture: this.texture,
        clear: false,
      });
      prevPosition.copyFrom(brush.position);
    };
    for (let i = 0; i < points.length; i += 2) {
      const x = points[i];
      const y = points[i + 1];
      redraw(x, y);
    }
  }
  addFromRect(rect: Rect) {}
}
