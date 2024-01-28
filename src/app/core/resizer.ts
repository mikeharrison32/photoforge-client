import { Cursor } from './Cursor';
import { Corner } from './corner';
import { MouseDragEvent } from './event';

export class Resizer {
  tr_corner?: Corner;
  tl_corner?: Corner;
  mr_corner?: Corner;
  ml_corner?: Corner;
  br_corner?: Corner;
  bl_corner?: Corner;
  constructor(elem: HTMLElement, options?: IResizerOptions) {
    const elemRect = elem.getBoundingClientRect();
    // this.tr_corner = new Corner(
    //   `${Math.random()}`,
    //   elemRect.left,
    //   elemRect.top
    // );
    // this.tr_corner.onMove((e: any) => {
    //   elem.style.width = e.clientX + 'px';
    //   elem.style.height = e.clientY + 'px';
    //   // elem.style.top = e.clientY + 'px';
    //   // elem.style.top = e.clientY + 'px';
    // });
  }
}

interface IResizerOptions {
  tr: boolean;
  tl: boolean;
  mr: boolean;
  ml: boolean;
  br: boolean;
  bl: boolean;
}
