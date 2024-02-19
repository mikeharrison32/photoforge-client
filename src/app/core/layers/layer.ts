import { Corner } from '../corner';
import { DraggableBehaviour } from '../draggable-behavior';
import { MouseDragEvent } from '../event';
import { Resizer } from '../resizer';
export class Layer {
  id: string = '';
  projectId: string = '';
  stackIndex: number = 0;
  name: string = '';
  type?: string;
  active: boolean = false;
  canvas?: HTMLElement | HTMLCanvasElement | null;
  ctx?: CanvasRenderingContext2D | null;
  resizer?: Resizer;
  displayWidth: number = 300;
  displayHeight: number = 300;
  scale: number = 2;
  visible: boolean = true;
  locked: boolean = false;
  corners: Corner[] = [];
  trCorner: Corner;
  tlCorner: Corner;
  brCorner: Corner;
  blCorner: Corner;
  constructor(
    containerElem: HTMLElement | null,
    id: string,
    name: string,
    projectId: string,
    useWebGL: boolean
  ) {
    this.id = id;
    this.projectId = projectId;
    this.name = name;
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('layer');
    this.canvas.style.position = 'absolute';
    this.canvas.style.left = '0';
    this.canvas.style.top = '0';
    if (!useWebGL) {
      this.ctx = (this.canvas as HTMLCanvasElement).getContext('2d');
    }
    containerElem?.appendChild(this.canvas);
    this.resizer = new Resizer(this.canvas);
    const rect = containerElem?.parentElement!.getBoundingClientRect();
    new MouseDragEvent(this.canvas!, false, (e: any) => {
      if (this.locked) {
        return;
      }
      this.canvas!.style.left =
        (e.x - rect!.left) / parseFloat(containerElem!.style.scale || '1') +
        'px';
      this.canvas!.style.top =
        (e.y - rect!.top) / parseFloat(containerElem!.style.scale || '1') +
        'px';
      this.render();
    });

    this.trCorner = new Corner(containerElem!.parentElement!, 0.5, 0.5, 0, 0);
    this.tlCorner = new Corner(containerElem!.parentElement!, 0.5, 0.5, 0, 0);
    this.brCorner = new Corner(containerElem!.parentElement!, 0.5, 0.5, 0, 0);
    this.blCorner = new Corner(containerElem!.parentElement!, 0.5, 0.5, 0, 0);
    this.corners = [this.trCorner, this.tlCorner, this.brCorner, this.blCorner];

    this.corners.forEach((corner) => {
      corner.elem!.classList.add('layer-corner');
      new DraggableBehaviour(corner.elem!);
    });
    new DraggableBehaviour(this.trCorner.elem!, 1, (e: any) => {
      this.canvas!.style.width = e.x + 'px';
      this.canvas!.style.height = e.y + 'px';
    });
    this.render();
  }
  hide() {
    this.visible = false;
    this.canvas!.style.display = 'none';
  }
  render() {
    // top right corner
    this.trCorner.elem!.style.left =
      this.canvas?.getClientRects()[0].left + 'px';
    this.trCorner.elem!.style.top = this.canvas?.getClientRects()[0].top + 'px';

    //top left corner
    this.tlCorner.elem!.style.left =
      this.canvas?.getClientRects()[0].width + 'px';
    this.tlCorner.elem!.style.top = this.canvas?.getClientRects()[0].top + 'px';

    //bottom right corner
    this.brCorner.elem!.style.left =
      this.canvas?.getClientRects()[0].left + 'px';
    this.brCorner.elem!.style.top =
      this.canvas?.getClientRects()[0].height + 'px';

    //bottom left corner
    this.blCorner.elem!.style.left =
      this.canvas?.getClientRects()[0].width + 'px';
    this.blCorner.elem!.style.top =
      this.canvas?.getClientRects()[0].height + 'px';
  }
  showCorners() {
    this.corners.forEach((corner) => {
      corner.elem!.style.display = 'block';
    });
  }
  hideCoreners() {}
  show() {
    this.visible = true;
    this.canvas!.style.display = 'block';
  }
  hideControles() {}
  showControles() {}
  setWidth(width: number) {
    this.canvas!.style.width = width + 'px';
    // (this.canvas as HTMLCanvasElement).width = width * this.scale;
    this.displayWidth = width;
  }
  setHeight(height: number) {
    this.canvas!.style.height = height + 'px';
    // (this.canvas as HTMLCanvasElement).height = height * this.scale;
    this.displayHeight = height;
  }

  drawImage(img: any) {}
  moveTo(x: number, y: number) {
    this.canvas!.style.left = x + 'px';
    this.canvas!.style.top = y + 'px';
  }
  sendBackward() {}
  sendToBack() {}
  bringForward() {}
  bringToFront() {}
}
