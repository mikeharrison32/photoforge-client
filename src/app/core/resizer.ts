import { Renderer2 } from '@angular/core';
import { Cursor } from './Cursor';
import { Corner } from './corner';
import { MouseDragEvent } from './event';
import { DataService } from './services/data.service';

export class Resizer {
  tr_corner?: Corner;
  tl_corner?: Corner;
  mr_corner?: Corner;
  ml_corner?: Corner;
  mb_corner?: Corner;
  mt_corner?: Corner;
  br_corner?: Corner;
  bl_corner?: Corner;
  elem!: HTMLElement;
  targetObject!: HTMLElement;
  data!: DataService;
  locked: boolean = false;
  constructor(
    private renderer: Renderer2,
    targetObject: HTMLElement,
    data: DataService,
    options?: IResizerOptions
  ) {
    options = {
      tr: true,
      bl: true,
      br: true,
      ml: true,
      mr: true,
      tl: true,
      mb: true,
      mt: true,
    };

    this.elem = this.renderer.createElement('div');
    this.elem.classList.add('resizer');
    this.targetObject = targetObject;
    this.elem.style.width = targetObject.clientWidth + 'px';
    this.elem.style.height = targetObject.clientHeight + 'px';
    this.data = data;
    this.renderer.appendChild(document.getElementById('resizers'), this.elem);

    if (options?.tr) {
      this.tr_corner = new Corner(this.elem);
      this.tr_corner.getElem().style.cursor = 'ne-resize';

      // let mousedown = false;
      // this.tr_corner.getElem().addEventListener('mousedown', (e) => {

      //   mousedown = true;
      // });
      // document.addEventListener('mouseup', (e) => {
      //   mousedown = false;
      // });
      // document.addEventListener('mousemove', (e) => {
      //   if (!mousedown) {
      //     return;
      //   }
      //   console.log('trcorn');
      //   const targetObjRect = targetObject.getBoundingClientRect();
      //   targetObject.style.width = `${e.clientX - targetObjRect.left}px`;
      //   targetObject.style.height = `${e.clientY - -targetObjRect.top}px`;
      // });
    }
    if (options?.tl) {
      this.tl_corner = new Corner(this.elem);
      this.tl_corner.getElem().style.cursor = 'nw-resize';
    }
    if (options?.mt) {
      this.mt_corner = new Corner(this.elem);
      this.mt_corner.getElem().style.cursor = 'n-resize';
    }
    if (options?.mb) {
      this.mb_corner = new Corner(this.elem);
      this.mb_corner.getElem().style.cursor = 'n-resize';
    }
    if (options?.ml) {
      this.ml_corner = new Corner(this.elem);
      this.ml_corner.getElem().style.cursor = 'e-resize';
    }
    if (options?.mr) {
      this.mr_corner = new Corner(this.elem);
      this.mr_corner.getElem().style.cursor = 'e-resize';
    }
    if (options?.br) {
      this.br_corner = new Corner(this.elem);
      this.br_corner.getElem().style.cursor = 'nw-resize';
    }
    if (options?.bl) {
      this.bl_corner = new Corner(this.elem);
      this.bl_corner.getElem().style.cursor = 'ne-resize';
    }

    this.makeElemDraggable();
    this.disable();
    //place the corner inside the elem provided
  }
  update() {
    const zoom = this.data.zoom.getValue() / 100;

    const targetObjRect = this.targetObject.getBoundingClientRect();
    // this.elem.style.transform = `translate(${targetObjRect.left}px, ${targetObjRect.top}px)`;
    // this.elem.style.left = targetObjRect.left * zoom + 'px';
    // this.elem.style.top = targetObjRect.top * zoom + 'px';
    this.setWidth(this.targetObject.clientWidth * zoom);
    this.setHeight(this.targetObject.clientHeight * zoom);
  }
  remove() {
    this.elem.remove();
    this.tr_corner?.getElem().remove();
    this.tl_corner?.getElem().remove();
    this.br_corner?.getElem().remove();
    this.mr_corner?.getElem().remove();
    this.ml_corner?.getElem().remove();
    this.bl_corner?.getElem().remove();
    this.mt_corner?.getElem().remove();
    this.mb_corner?.getElem().remove();
  }
  lock() {
    this.disableCorners();
    this.locked = true;
  }
  unlock() {
    this.enableCorners();
    this.locked = false;
  }
  disable() {
    this.elem.style.display = 'none';
  }
  enable() {
    this.elem.style.display = 'block';
    this.update();
    this.updateCorners();
  }
  setWidth(width: number) {
    this.elem.style.width = width + 'px';
    // this.elem.style.transform = `translate(${
    //   this.targetObject.getBoundingClientRect().left
    // }px, ${this.targetObject.getBoundingClientRect().top}px)`;
    this.updateCorners();
  }
  private updateCorners() {
    this.updateTrCorner();
    this.updateTlCorner();
    this.updateBlCorner();
    this.updateBrCorner();
    this.updateMrCorner();
    this.updateMlCorner();
    this.updateMtCorner();
    this.updateMbCorner();
  }

  private updateBrCorner() {
    const br_corner_elem = this.br_corner!.getElem();
    br_corner_elem.style.transform = `translate(${
      this.elem.getBoundingClientRect().width - 16 / 2
    }px, ${this.elem.getBoundingClientRect().height - 16 / 2}px)`;
  }
  private updateMrCorner() {
    const mr_corner_elem = this.mr_corner!.getElem();
    mr_corner_elem.classList.add('mrt_corner');
    mr_corner_elem.style.transform = `translate(${
      -mr_corner_elem.clientWidth / 2
    }px, ${this.elem.getBoundingClientRect().height / 2}px)`;
  }
  private updateMlCorner() {
    const ml_corner_elem = this.ml_corner!.getElem();
    ml_corner_elem.classList.add('mrt_corner');
    ml_corner_elem.style.transform = `translate(${
      this.elem.getBoundingClientRect().width - ml_corner_elem.clientWidth / 2
    }px, ${this.elem.getBoundingClientRect().height / 2}px)`;
  }
  private updateMtCorner() {
    const mt_corner_elem = this.mt_corner!.getElem();
    mt_corner_elem.classList.add('mtt_corner');
    mt_corner_elem.style.transform = `translate(${
      this.elem.getBoundingClientRect().width / 2 -
      mt_corner_elem.clientWidth / 2
    }px, ${-mt_corner_elem.clientHeight / 2}px)`;
  }
  private updateMbCorner() {
    const mb_corner_elem = this.mb_corner!.getElem();
    mb_corner_elem.classList.add('mtt_corner');
    mb_corner_elem.style.transform = `translate(${
      this.elem.getBoundingClientRect().width / 2 -
      mb_corner_elem.clientWidth / 2
    }px, ${
      this.elem.getBoundingClientRect().height - mb_corner_elem.clientHeight / 2
    }px)`;
  }

  private updateBlCorner() {
    const bl_corner_elem = this.bl_corner!.getElem();
    bl_corner_elem.style.transform = `translate(${-16 / 2}px, ${
      this.elem.getBoundingClientRect().height - 16 / 2
    }px)`;
  }

  private updateTlCorner() {
    const tl_corner_elem = this.tl_corner!.getElem();
    tl_corner_elem.style.transform = `translate(${-16 / 2}px, ${-16 / 2}px)`;
  }

  private updateTrCorner() {
    const tr_corner_elem = this.tr_corner!.getElem();
    const cornerSize = tr_corner_elem.clientWidth;
    tr_corner_elem.style.transform = `translate(${
      this.elem.getBoundingClientRect().width - cornerSize / 2
    }px, ${-cornerSize / 2}px)`;
  }

  setHeight(height: number) {
    this.elem.style.height = height + 'px';
    this.updateCorners();
  }
  private makeElemDraggable() {
    const rect = this.elem.getBoundingClientRect();
    let resize = 'n';
    this.elem.addEventListener('mousedown', (e) => {
      const tr_corner = this.tr_corner?.getElem();
      const br_corner = this.br_corner?.getElem();
      const bl_corner = this.bl_corner?.getElem();
      const tl_corner = this.tl_corner?.getElem();
      const targetElem = e.target as HTMLElement;
      if (tr_corner?.contains(targetElem)) {
        resize = 'tr';
      } else if (br_corner?.contains(targetElem)) {
        resize = 'br';
      } else if (bl_corner?.contains(targetElem)) {
        resize = 'bl';
      } else if (tl_corner?.contains(targetElem)) {
        resize = 'tl';
      } else {
        resize = '';
      }
    });

    document.addEventListener('mouseup', (e) => {
      resize = 'n';
      if (!this.locked) {
        this.enableCorners();
      }
    });

    document.addEventListener('mousemove', (e) => {
      if (!this.data.isMovingAllowed.getValue() || this.locked) {
        console.log('not allowwed');
        return;
      }

      if (resize == 'tl') {
        this.targetObject.style.width = `${e.clientX}px`;
        this.targetObject.style.height = `${e.clientY}px`;
        const rect = this.elem.getBoundingClientRect()!;
        this.elem.style.left = `${e.clientX - rect.left}px`;
        this.elem.style.top = `${e.clientY - rect.right}px`;
        this.setWidth(this.elem.clientWidth - e.clientX);
        this.setHeight(this.elem.clientHeight - e.clientY);
        return;
      } else if (resize == 'tr') {
      } else if (resize == 'br') {
        this.targetObject.style.width = `${e.clientX}px`;
        this.targetObject.style.height = `${e.clientY}px`;

        this.elem.style.left = `${this.elem.style.left}`;
        this.elem.style.top = `${this.elem.style.top}`;
        // const rect = this.tr_corner?.getElem().getBoundingClientRect()!;
        this.setWidth(e.clientX);
        this.setHeight(e.clientY);
      } else if (resize != '') {
        return;
      }

      this.disableCorners();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.elem.style.left = `${x}px`;
      this.elem.style.top = `${y}px`;

      let zoom = this.data.zoom.getValue() / 100;
      this.targetObject.style.left = `${x / zoom}px`;
      this.targetObject.style.top = `${y / zoom}px`;
    });
  }
  disableCorners() {
    this.tr_corner!.getElem().style.opacity = '0';
    this.br_corner!.getElem().style.opacity = '0';
    this.tl_corner!.getElem().style.opacity = '0';
    this.bl_corner!.getElem().style.opacity = '0';

    this.ml_corner!.getElem().style.opacity = '0';
    this.mr_corner!.getElem().style.opacity = '0';
    this.mb_corner!.getElem().style.opacity = '0';
    this.mt_corner!.getElem().style.opacity = '0';
  }
  enableCorners() {
    this.tr_corner!.getElem().style.opacity = '1';
    this.br_corner!.getElem().style.opacity = '1';
    this.tl_corner!.getElem().style.opacity = '1';
    this.bl_corner!.getElem().style.opacity = '1';

    this.ml_corner!.getElem().style.opacity = '1';
    this.mr_corner!.getElem().style.opacity = '1';
    this.mb_corner!.getElem().style.opacity = '1';
    this.mt_corner!.getElem().style.opacity = '1';
  }
}

interface IResizerOptions {
  tr: boolean;
  tl: boolean;
  mr: boolean;
  ml: boolean;
  mb: boolean;
  mt: boolean;
  br: boolean;
  bl: boolean;
}
