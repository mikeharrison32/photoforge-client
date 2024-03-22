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
  prevPosition?: PIXI.Point;
  lineFill?: PIXI.Graphics;
  brush?: PIXI.Graphics;
  points: number[] = [];
  constructor(
    canvas: HTMLCanvasElement | PIXI.Application,
    texture?: PIXI.RenderTexture,
    points?: number[]
  ) {
    if (texture) {
      this.texture = texture;
    }
    if (canvas instanceof HTMLCanvasElement) {
    } else if (canvas instanceof PIXI.Application) {
      this.app = canvas;
      console.log('canvas innstance of app');
      this.texture = PIXI.RenderTexture.create({
        width: this.app?.view.width,
        height: this.app?.view.height,
      });
      if (!points) {
        return;
      }
      if (texture) {
        this.addFromPoints(points, texture);
      }
    }
  }
  show() {}
  clear() {}
  intersect(sl: Selection) {}
  subtract(sl: Selection) {}

  addFromPoints(points: number[], texture: PIXI.RenderTexture) {
    this.points = points;
    let color = 'black';
    if (!this.prevPosition) {
      this.prevPosition = new PIXI.Point(points[0], points[1]);
    }
    if (!this.lineFill) {
      this.lineFill = new PIXI.Graphics().beginFill('black');
    }
    if (!this.brush) {
      this.brush = new PIXI.Graphics().beginFill('black');
    }
    const redraw = (x: number, y: number) => {
      color = color == 'black' ? 'white' : 'black';
      this.brush!.position.set(x, y);
      this.app?.renderer.render(this.brush!, {
        renderTexture: texture,
        clear: false,
      });
      this.lineFill!.clear()
        .lineStyle({ width: 2, color })
        .moveTo(this.prevPosition!.x, this.prevPosition!.y)
        .lineTo(this.brush!.x, this.brush!.y);
      this.app?.renderer.render(this.lineFill!, {
        renderTexture: texture,
        clear: false,
      });
      this.prevPosition!.copyFrom(this.brush!.position);
    };
    for (let i = 0; i < points.length; i += 2) {
      const x = points[i];
      const y = points[i + 1];
      redraw(x, y);
    }
    // const ticker = this.app?.ticker.add(() => {
    // setInterval(() => {
    //   console.log('int');
    //   color = color == 'black' ? 'white' : 'black';
    //   for (let i = 0; i < points.length; i += 2) {
    //     const x = points[i];
    //     const y = points[i + 1];
    //     redraw(x, y);
    //   }
    // }, 800);
    // })
    // ticker!.autoStart = true;
  }
  clearSelection(texture: PIXI.RenderTexture) {
    const emptyTexture = PIXI.Sprite.from(PIXI.Texture.EMPTY);
    this.app?.renderer.render(emptyTexture, {
      renderTexture: texture,
      clear: true,
    });
  }
  isPointInsideSelection(x: number, y: number) {
    const poly = new PIXI.Polygon(this.points);
    return poly.contains(x, y);
  }
  addFromRect(rect: Rect) {
    let color = 'black';
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
    const prevPosition = new PIXI.Point();
    const lineFill = new PIXI.Graphics().beginFill('black');
    const brush = new PIXI.Graphics().beginFill('black');
    redraw(rect.x, rect.y);
    redraw(rect.x + rect.width, rect.y);
    redraw(rect.x + rect.width, rect.y + rect.height);
    redraw(rect.x, rect.y + rect.height);
    redraw(rect.x, rect.y);
  }
}
