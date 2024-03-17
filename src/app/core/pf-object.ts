import { Renderer2 } from '@angular/core';
import { Resizer } from './resizer';
import { DataService } from './services/data.service';

export class PfObject {
  resizer!: Resizer;
  elem!: HTMLElement;
  constructor(
    protected renderer: Renderer2,
    container: HTMLElement,
    data: DataService
  ) {
    this.elem = document.createElement('div');
    this.elem.classList.add('pf-object');
    this.renderer.appendChild(container, this.elem);
    this.resizer = new Resizer(this.renderer, this.elem, data);
  }
  remove() {
    this.elem.remove();
    this.resizer.remove();
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
