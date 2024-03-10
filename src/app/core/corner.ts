//a single corner
export class Corner {
  private elem!: HTMLElement;
  constructor(container: HTMLElement) {
    this.elem = document.createElement('div');
    this.elem.classList.add('rs-corner');
    container.appendChild(this.elem);
  }

  onMoveDown(cb: Function) {
    this.elem.addEventListener('mousedown', (e) => {
      cb(e);
    });
  }
  getElem() {
    return this.elem;
  }
}
