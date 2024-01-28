
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
    if(!useWebGL){
      this.ctx = (this.canvas as HTMLCanvasElement).getContext('2d');
    }
    containerElem?.appendChild(this.canvas);
    this.resizer = new Resizer(this.canvas);
    new MouseDragEvent(this.canvas!,true ,(e: any) => {
      this.canvas!.style.left = e.x / parseFloat(containerElem!.style.scale || "1") + "px";
      this.canvas!.style.top = e.y / parseFloat(containerElem!.style.scale || "1") + "px";

    })
  }
  hide() {
    this.visible = false;
    this.canvas!.style.display = 'none';
  }
  show() {
    this.visible = true;
    this.canvas!.style.display = 'block';
  }
  hideControles() {}
  showControles() {}
  setWidth(width: number) {
    this.canvas!.style.width = width + 'px';
    (this.canvas as HTMLCanvasElement).width = width * this.scale;
    this.displayWidth = width;
  }
  setHeight(height: number) {
    this.canvas!.style.height = height + 'px';
    (this.canvas as HTMLCanvasElement).height = height * this.scale;
    this.displayHeight = height;
  }

  drawImage(img: any) {}
  moveTo(x: number, y: number) {}
  sendBackward() {}
  sendToBack() {}
  bringForward() {}
  bringToFront() {}
}
