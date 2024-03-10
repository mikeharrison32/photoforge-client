import { PfObject } from './pf-object';

export class History {
  undoStack: Command[] = [];
  redoStack: Command[] = [];
}

export class Command {
  constructor() {}
  execute() {}
}

export class Mask {
  svg!: SVGElement;
  path!: SVGPathElement;
  clipPath!: SVGClipPathElement;
  defs!: SVGDefsElement;
  constructor(target: PfObject, points?: number[]) {
    console.log(points);
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    this.clipPath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'clipPath'
    );
    this.path.setAttribute('stroke', 'black');
    this.path.setAttribute('fill', 'none');
    this.path.setAttribute('stroke-width', '1');
    if (points) {
      let d = this.path.getAttribute('d');
      if (!d) {
        d = `M${points[0]},${points[1]}`;
        this.path.setAttribute('d', d);
      }
      for (let i = 0; i < points.length; i++) {
        let x = points[i];
        let y = points[i + 1];
        const pathData = this.path.getAttribute('d');
        // console.log(pathData);
        const pathPoints = pathData!.split(',').map(parseFloat);
        // console.log('pathPoints: ', pathPoints);
        const lastX = pathPoints[pathPoints.length - 2]; // Get the x-coordinate of the last point
        const lastY = pathPoints[pathPoints.length - 1];
        // console.log('lastpointX: ', lastX);
        // console.log('lastpointY: ', lastY);

        const distance = Math.sqrt((x - lastX) ** 2 + (y - lastY) ** 2);
        // console.log('dist: ', distance);

        // if (distance > 5) {
        // Adjust the threshold distance for points here
        this.path.setAttribute('d', `${pathData} L${x},${y}`);
        // }
      }
    }
    const clipId = `id_${Math.random()}`;

    // this.path.setAttribute(
    //   'd',
    //   `${createCirclePath(300, 300, 60)}${createCirclePath(310, 300, 60)}`
    // );
    this.clipPath.appendChild(this.path);
    this.clipPath.id = clipId;
    this.defs.appendChild(this.clipPath);
    this.svg.appendChild(this.defs);

    target.elem.style.clipPath = `url(#${clipId})`;
    target.elem.appendChild(this.svg);
  }
  reveal(x: number, y: number, r: number) {
    const pathData = this.path.getAttribute('d');

    this.path.setAttribute(
      'd',
      `${pathData || ''} ${createCirclePath(x, y, r)}`
    );
  }
  hide(x: number, y: number) {}
}

export function createCirclePath(cx: number, cy: number, r: number) {
  const x0 = cx + r; // x-coordinate of the rightmost point of the circle
  const y0 = cy; // y-coordinate of the center of the circle
  const kappa = 0.5522848; // Cubic Bezier control point constant

  // Construct the path data string for the circle using Cubic Bezier curves
  const pathData = `
    M ${x0},${y0}
    C ${x0},${y0 + kappa * r} ${cx + kappa * r},${cy + r} ${cx},${cy + r}
    C ${cx - kappa * r},${cy + r} ${cx - r},${cy + kappa * r} ${cx - r},${cy}
    C ${cx - r},${cy - kappa * r} ${cx - kappa * r},${cy - r} ${cx},${cy - r}
    C ${cx + kappa * r},${cy - r} ${x0},${y0 - kappa * r} ${x0},${y0}
    Z`;

  return pathData;
}
