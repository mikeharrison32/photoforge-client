import * as PIXI from 'pixi.js-legacy';
interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}
interface ISelection {
  view?: HTMLElement;
  points: number[];
}
interface ISelectionOptions {
  width?: number;
  height?: number;
}
export class Selection implements ISelection {
  private app?: PIXI.Application;
  private texture: PIXI.RenderTexture | undefined;
  private prevPosition?: PIXI.Point;
  private lineFill?: PIXI.Graphics;
  private brush?: PIXI.Graphics;
  view?: HTMLElement;
  points: number[] = [];
  private drawingSurface: PIXI.Sprite;
  constructor(options?: ISelectionOptions) {
    this.app = new PIXI.Application({
      background: 'transparent',
      backgroundAlpha: 0,
      backgroundColor: 'transparent',
    });

    const view = this.app.view as any;
    view.classList.add('selection');
    view.style.width = `${options?.width}px` || '100%';
    view.style.height = `${options?.height}px` || '100%';
    this.texture = PIXI.RenderTexture.create({
      width: options?.width || this.app?.view.width,
      height: options?.height || this.app?.view.height,
    });
    this.drawingSurface = new PIXI.Sprite(this.texture);
    this.app.stage.addChild(this.drawingSurface);
    this.view = this.app.view as any;
  }
  show() {}
  clear() {}
  intersect(sl: Selection) {}
  subtract(sl: Selection) {}

  addFromPoints(points: number[]) {
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
        renderTexture: this.texture,
        clear: false,
      });
      this.lineFill!.clear()
        .lineStyle({ width: 1, color })
        .moveTo(this.prevPosition!.x, this.prevPosition!.y)
        .lineTo(this.brush!.x, this.brush!.y);
      this.app?.renderer.render(this.lineFill!, {
        renderTexture: this.texture,
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
    //   // this.clearSelection(texture);
    //   color = color == 'black' ? 'white' : 'black';
    //   for (let i = 0; i < points.length; i += 2) {
    //     const x = points[i];
    //     const y = points[i + 1];
    //     redraw(x, y);
    //   }
    // }, 300);
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
