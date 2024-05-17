import { Renderer2 } from '@angular/core';
import { Resizer } from './resizer';
import { DataService } from './services/data.service';

export class PfObject {
  resizer!: Resizer;
  elem!: HTMLElement;
  data!: DataService;
    x: number = 0;
  y: number = 0;
  constructor(
    protected renderer: Renderer2,
    // container: HTMLElement,
    data: DataService
  ) {
    this.data = data;
    this.elem = document.createElement('div');
    this.elem.classList.add('pf-object');
    // this.renderer.appendChild(container, this.elem);
    this.resizer = new Resizer(this.renderer, this.elem, data);
  }
  moveTo(x: number, y: number) {
    let zoom = this.data.zoom.getValue() / 100;
    this.elem.style.left = x + 'px';
    this.elem.style.top = y + 'px';
    this.x = x 
    this.y = y 
    this.resizer.moveTo(x * zoom, y * zoom);
  }
  remove() {
    this.elem.remove();
    this.resizer.remove();
  }
  getElem() {
    return this.elem;
  }
  setWidth(width: number) {
    this.elem.style.width = `${width}px`;
  }
  setHeight(height: number) {
    this.elem.style.height = `${height}px`;
  }
  contains(elem: HTMLElement) {
    return this.elem.contains(elem) || this.resizer.elem.contains(elem);
  }
}
