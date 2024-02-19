export class Corner {
  elem?: HTMLElement;
  parent?: HTMLElement;
  constructor(
    parent: HTMLElement,
    width: number,
    height: number,
    x: number,
    y: number
  ) {
    this.elem = document.createElement('div');
    this.elem.style.background = '#fff';
    this.elem.style.width = width + 'rem';
    this.elem.style.height = height + 'rem';
    this.elem.style.position = 'absolute';
    this.elem.style.left = x + 'px';
    this.elem.style.top = y + 'px';
    this.elem.style.zIndex = '100000000';
    this.parent = parent;
    parent.appendChild(this.elem);
  }

  moveTo(x: number, y: number) {
    const rect = this.parent!.getBoundingClientRect();
    this.elem!.style.left = x + 'px';
    this.elem!.style.top = y + 'px';
  }
}
