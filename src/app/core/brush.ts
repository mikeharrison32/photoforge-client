export class Brush {
  elem?: HTMLElement;
  constructor(options?: IBrushOptions) {
    this.elem = document.createElement('div');
    this.elem.classList.add('brush');
    this.elem.style.width = options?.size + 'px' || 10 + 'px';
    this.elem.style.height = options?.size + 'px' || 10 + 'px';
  }
  setSize(size: number) {
    this.elem!.style.width = size + 'px';
    this.elem!.style.height = size + 'px';
  }
  moveTo(x: number, y: number) {
    let rect = this.elem?.getBoundingClientRect();
    this.elem!.style.left = x + 'px';
    this.elem!.style.top = y + 'px';
  }
  destroy() {}
}

interface IBrushOptions {
  size?: number;
}
