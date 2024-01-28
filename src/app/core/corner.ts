export class Corner {
  cornerElem?: HTMLElement;
  mousedown: boolean = false;

  constructor(id: string, x: number, y: number) {
    this.cornerElem = document.createElement('div');
    this.cornerElem.id = id;
    this.cornerElem.classList.add('corner');
    this.cornerElem.style.left = x + 'px';
    this.cornerElem.style.top = y + 'px';
    this.cornerElem.style.width = '100px';
    this.cornerElem.style.height = '100px';
    this.cornerElem.style.background = 'blue';
    this.cornerElem.style.position = 'absolute';
    this.cornerElem.addEventListener('mousedown', (e) => {
      this.mousedown = true;
    });
    document.addEventListener('mouseup', (e) => {
      this.mousedown = false;
    });

    const imgDisplayElem = document.getElementById('image-display');
    imgDisplayElem?.appendChild(this.cornerElem);
    console.log('imgDisplay', imgDisplayElem);
  }

  onMove(cb: Function) {
    document.addEventListener('mousemove', (e) => {
      if (!this.mousedown) {
        return;
      }
      const rect = this.cornerElem?.getBoundingClientRect();
      this.cornerElem!.style.left = e.clientX - rect!.left + rect!.width + 'px';
      this.cornerElem!.style.top = e.clientY - rect!.top + +rect!.height + 'px';
      cb(e);
    });
  }
}
