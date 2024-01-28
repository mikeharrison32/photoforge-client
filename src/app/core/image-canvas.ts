export class ImageCanvas {
  private elem?: HTMLElement | HTMLCanvasElement;
  private displayElem?: HTMLElement | null;
  private ctx?: CanvasRenderingContext2D | null;
  constructor(url: string, displayId: string) {
    console.log('Creating a canvas');
    this.elem = document.createElement('canvas');
    this.displayElem = document.getElementById('display');
    this.ctx = (this.elem as HTMLCanvasElement).getContext('2d');
    const img = new Image();
    img.src = url;
    this.elem.style.width = `${img.width}px`;
    this.elem.style.height = `${img.height}px`;
    this.elem.classList.add('image-canvas');
    this.ctx?.drawImage(img, 0, 0, img.width, img.height);
    console.log('Drawing image.');
    this.displayElem?.appendChild(this.elem);
    document.body.appendChild(this.elem);
  }
}

interface IImageCanvasOptions {
  width: number;
  height: number;
}
