import { PixelLayer } from 'src/app/core/layers/pixel-layer';
import { MouseDragEvent } from '../../event';
import { Canvas } from '../../canvas';
import { Selection } from '../../selection';
import { getPixelsWithinCustomSelection, replacePixels } from '../../utils';
import * as PIXI from 'pixi.js-legacy';
import { DataService } from '../../services/data.service';
export class LassoTool {
  lassoCanvas?: PIXI.Application;
  type: string = 'lassoTool';
  points: number[] = [];
  texture!: PIXI.RenderTexture;
  drawingSurface!: PIXI.Sprite;
  data?: DataService;
  configure(display: HTMLElement, data: DataService) {
    this.data = data;
    console.log('lasso tool configured.');
    this.lassoCanvas = new PIXI.Application({
      width: display.parentElement?.clientWidth,
      height: display.parentElement?.clientHeight,
      background: 'transparent',
      backgroundAlpha: 0,
      antialias: true,
    });
    (this.lassoCanvas.view as any).classList.add('lasso-canvas');
    this.addlassoCanvas(display.parentElement!);

    this.setupDrawingFeature();
    this.registerListeners();
  }

  private addlassoCanvas(display: HTMLElement) {
    display.appendChild(this.lassoCanvas?.view as any);
  }

  private setupDrawingFeature() {
    // const redrawLess = _.throttle(redraw, 50);

    // drawingSurface.interactive = true;
    this.drawingSurface.eventMode = 'static';
    let mousedown = false;
    this.drawingSurface.on('mousedown', (e) => {
      mousedown = true;
    });
    this.drawingSurface.on('mousemove', (c) => {
      if (!mousedown) {
        return;
      }
    });
    this.drawingSurface.on('mouseup', () => {
      mousedown = false;
    });

    this.lassoCanvas?.stage.addChild(this.drawingSurface);
  }

  private clearCanvas(texture: PIXI.RenderTexture) {
    const emptyTexture = PIXI.Sprite.from(PIXI.Texture.EMPTY);

    this.lassoCanvas?.renderer.render(emptyTexture, {
      renderTexture: texture,
      clear: true,
    });
  }

  private clearLassoCanvas(ctx: CanvasRenderingContext2D) {}

  private registerListeners() {
    document.addEventListener('keydown', (e) => {
      if (e.code == 'Enter') {
        const selection = new Selection(this.lassoCanvas!, this.points);

        const layer = this.data?.selectedLayers.getValue()[0];
        console.log(layer);
        if (layer && layer instanceof PixelLayer) {
          // const selection = new Selection(layer.app!, this.points);
        }
        //   let color = 'black';
        //   const poly = new PIXI.Graphics().beginFill('black');
        //   poly.drawPolygon(this.points);

        //   this.lassoCanvas?.stage.addChild(poly);

        //   setInterval(() => {
        //     this.insertSelection(color);
        //     color = color == 'black' ? 'white' : 'black';
        //   }, 200);
        // } else if (e.code == 'Delete') {
      }
    });
  }

  private insertSelection(color: string) {
    const brush = new PIXI.Graphics().beginFill('black');
    const lineFill = new PIXI.Graphics();
    const prevPosition = new PIXI.Point(this.points[0], this.points[1]);
    this.clearCanvas(this.texture);
    for (let i = 0; i < this.points.length; i += 2) {
      let x = this.points[i];
      let y = this.points[i + 1];
      brush.position.set(x, y);
      this.lassoCanvas?.renderer.render(brush, {
        renderTexture: this.texture,
        clear: false,
      });
      lineFill
        .clear()
        .lineStyle(2, color)
        .moveTo(prevPosition.x, prevPosition.y)
        .lineTo(brush.x, brush.y);
      this.lassoCanvas?.renderer.render(lineFill, {
        renderTexture: this.texture,
        clear: false,
      });
      prevPosition.copyFrom(brush.position);
    }
  }
  adjustPoints(pts: number[], len: number) {
    let prevPoint = new PIXI.Point(pts[0], pts[1]);
    let curPoint = new PIXI.Point(pts[0], pts[1]);
    for (let i = 0; i < pts.length; i += 2) {
      let x1 = pts[i];
      let y1 = pts[i];
      let x2 = pts[i];
      let y2 = pts[i + 1];
      let current_length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      if (current_length != len) {
        let ratio = length / current_length;
        let x2_new = x1 + (x2 - x1) * ratio;
        let y2_new = y1 + (y2 - y1) * ratio;
        pts[i + 1] = x2_new;
        pts[i + 1] = x2_new;
      }
    }
    return pts;
  }
  applySelection(ctx: CanvasRenderingContext2D) {
    this.clearLassoCanvas(ctx);
    const selection = new Selection(ctx.canvas, this.points);
    selection.show();
  }
  disconfigure(): void {
    this.lassoCanvas?.destroy(true);
    delete this.lassoCanvas;
  }
}

export const lassoTool = new LassoTool();

const points = [
  [0, 0],
  [1, 0],
  [0.5, 1],
  [2, 0],
  [2, 2],
  [1, 1],
  [3, 0],
  [3, 1],
  [3, 3],
];

// Function to find the convex hull
function convexHull(points: number[][]) {
  // Function to check the orientation of 3 points
  function orientation(p1: number[], p2: number[], p3: number[]) {
    return (
      (p2[1] - p1[1]) * (p3[0] - p2[0]) - (p2[0] - p1[0]) * (p3[1] - p2[1])
    );
  }

  // Sort the points based on x-coordinate
  points.sort((p1, p2) => p1[0] - p2[0]);

  // Initialize two arrays for the upper and lower hulls
  const upper = [];
  const lower = [];

  // Compute the upper hull
  for (let i = 0; i < points.length; i++) {
    while (
      upper.length >= 2 &&
      orientation(
        upper[upper.length - 2],
        upper[upper.length - 1],
        points[i]
      ) >= 0
    ) {
      upper.pop();
    }
    upper.push(points[i]);
  }

  // Compute the lower hull
  for (let i = points.length - 1; i >= 0; i--) {
    while (
      lower.length >= 2 &&
      orientation(
        lower[lower.length - 2],
        lower[lower.length - 1],
        points[i]
      ) >= 0
    ) {
      lower.pop();
    }
    lower.push(points[i]);
  }

  // Remove the first and last points from the lower hull to avoid duplicate points
  lower.shift();
  lower.pop();

  // Combine the upper and lower hulls
  const hull = upper.concat(lower);

  // Return the convex hull
  return hull;
}

// Compute the convex hull
const convexHullPoints = convexHull(points);

console.log(convexHullPoints);

// JavaScript program with the same function and variable names as the C++ code

class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

function point_in_polygon(point: Point, polygon: Point[]) {
  const num_vertices = polygon.length;
  const x = point.x;
  const y = point.y;
  let inside = false;

  let p1 = polygon[0];
  let p2;

  for (let i = 1; i <= num_vertices; i++) {
    p2 = polygon[i % num_vertices];

    if (y > Math.min(p1.y, p2.y)) {
      if (y <= Math.max(p1.y, p2.y)) {
        if (x <= Math.max(p1.x, p2.x)) {
          const x_intersection =
            ((y - p1.y) * (p2.x - p1.x)) / (p2.y - p1.y) + p1.x;

          if (p1.x === p2.x || x <= x_intersection) {
            inside = !inside;
          }
        }
      }
    }

    p1 = p2;
  }

  return inside;
}

const point = new Point(150, 85);

const polygon = [
  new Point(186, 14),
  new Point(186, 44),
  new Point(175, 115),
  new Point(175, 85),
];

if (point_in_polygon(point, polygon)) {
  console.log('Point is inside the polygon');
} else {
  console.log('Point is outside the polygon');
}
