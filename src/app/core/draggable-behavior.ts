import { MouseDragEvent } from './event';

export class DraggableBehaviour {
  elem: HTMLElement;
  constructor(elem: HTMLElement, scale?: number, cb?: Function) {
    this.elem = elem;
    let rect = elem.getBoundingClientRect();
    new MouseDragEvent(elem, false, (e: any) => {
      elem.style.left = scale ? (e.x - rect!.left) / scale + 'px' : e.x + 'px';
      elem.style.top = scale ? (e.y - rect!.top) / scale + 'px' : e.y + 'px';
      console.log(e.y);
      console.log(elem.style.top);
      if (cb) {
        cb(e);
      }
    });
  }
  ondrag(cb: Function) {
    cb();
  }
}
