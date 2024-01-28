
/**
 * A class for detecting when the mouse mouse while holding mousedown 
 */
export class MouseDragEvent {
  constructor(elem: HTMLElement,calcRect: boolean, cb: Function) {
    let mousedown = false;
    const rect = elem.getBoundingClientRect();
    elem.addEventListener("mousedown", () => {
      mousedown = true;
    });
    document.addEventListener("mousemove",  (e) => {
      if (!mousedown) return;
      if(calcRect){
        cb({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }else {
        cb({ x: e.clientX , y: e.clientY  });

      }
    });
    document.addEventListener("mouseup",  () => {
      mousedown = false;
    });
  }
  

}

