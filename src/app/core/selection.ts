import * as PIXI from 'pixi.js-legacy';
export class Selection {
  constructor(canvas: HTMLCanvasElement | PIXI.Application, points?: number[]) {
    if (canvas instanceof HTMLCanvasElement) {
    } else if (canvas instanceof PIXI.Application && points) {
      const selectionLine = new PIXI.Graphics();
      selectionLine.moveTo(points[0], points[1]);
      selectionLine.lineStyle({ color: 'red', width: 6 });

      for (let i = 0; i < points.length; i += 2) {
        let x = points[i];
        let y = points[i + 1];
        selectionLine.lineTo(x, y);
      }
    }
  }
  show() {}
  clear() {}
  intersect(sl: Selection) {}
  subtract(sl: Selection) {}
  add(points: number[]) {}
}
