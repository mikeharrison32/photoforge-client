import { MouseDragEvent } from './event';

export class DraggableBehaviour {
  elem: HTMLElement;
  constructor(elem: HTMLElement, scale?: number, cb?: Function) {
    this.elem = elem;
    let rect = elem.parentElement!.getBoundingClientRect();
    new MouseDragEvent(elem, false, (e: any) => {
      elem.style.left = scale
        ? (e.x - rect!.left) / scale + 'px'
        : e.x - rect!.left + 'px';
      elem.style.top = scale
        ? (e.y - rect!.top) / scale + 'px'
        : e.y - rect!.top + 'px';
      if (cb) {
        cb(e);
      }
    });
  }
  ondrag(cb: Function) {
    cb();
  }
}
