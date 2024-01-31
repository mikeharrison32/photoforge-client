export class Canvas {
  elem?: HTMLCanvasElement;
  get style() {
    return this.elem?.style;
  }
  constructor(options?: ICanvasOptions) {
    this.elem = document.createElement('canvas');
    this.elem.style.zIndex = '100000';
    if (options?.width && options.height) {
      this.style!.width = options.width + 'px';
      this.style!.height = options.height + 'px';
      this.elem.width = options.width * 2;
      this.elem.height = options.height * 2;
    }

    if (options?.x && options.y) {
      this.style!.left = options.x + 'px';
      this.style!.right = options.y + 'px';
    }

    if (options?.position) {
      this.style!.position = options.position;
    }
  }
  getContext(contextId: string) {
    return this.elem?.getContext(contextId);
  }
}

interface ICanvasOptions {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  position?: string;
}
