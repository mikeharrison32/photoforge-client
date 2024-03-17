import { Renderer2 } from '@angular/core';
import { PfObject } from '../pf-object';
import { DataService } from '../services/data.service';
export class Layer extends PfObject {
  id: string = '';
  projectId: string = '';
  stackIndex: number = 0;
  name: string = '';
  type?: string;
  active: boolean = false;
  visible: boolean = true;
  locked: boolean = false;
  constructor(
    renderer: Renderer2,
    containerElem: HTMLElement | null,
    data: DataService,
    id: string,
    name: string,
    projectId: string
  ) {
    super(renderer, containerElem!, data);
    this.id = id;
    this.projectId = projectId;
    this.name = name;
  }
  hide() {
    this.elem.style.display = 'none';
    this.resizer.elem.style.display = 'none';
    this.visible = false;
    this.resizer.disable();
  }
  hideCoreners() {}
  show() {
    this.elem.style.display = 'block';
    this.visible = true;
  }

  hideControles() {}
  showControles() {}
  clone() {
    return this.elem.cloneNode(true);
  }
  drawImage(img: any) {}
  moveTo(x: number, y: number) {}
  sendBackward() {}
  sendToBack() {}
  bringForward() {}
  bringToFront() {}
  lock() {
    this.locked = true;
    this.resizer.lock();
  }
  unlock() {
    this.locked = false;
    this.resizer.unlock();
  }
}
