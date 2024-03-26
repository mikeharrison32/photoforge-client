import * as PIXI from 'pixi.js-legacy';
import { Layer } from './layer';
import { ITextToolOptions } from '../tools';
import { Renderer2 } from '@angular/core';
import { DataService } from '../services/data.service';
export class TypeLayer extends Layer {
  app!: PIXI.Application;
  textarea?: HTMLElement;
  properties: ITextToolOptions = {
    textAlign: 'left',
  };
  textElem!: HTMLElement;
  constructor(
    renderer: Renderer2,
    // containerElem: HTMLElement,
    data: DataService,
    id: string,
    name: string,
    projectId: string,
    text?: string,
    options?: ITextToolOptions
  ) {
    super(renderer, data, id, name, projectId);
    this.type = 'type';
    this.textElem = this.renderer.createElement('p');
    this.textElem.textContent = text || 'Hello';
    this.renderer.appendChild(this.elem, this.textElem);
    this.resizer.setWidth(this.elem.clientWidth);
    this.resizer.setHeight(this.elem.clientHeight);

    this.elem.addEventListener('dblclick', (e) => {
      // this.elem.style.opacity = '0';
      const textarea = document.createElement('textarea');
      textarea.value = this.textElem.textContent || '';
      textarea.select();
      textarea.classList.add('textarea');
      const elemRect = this.elem.getBoundingClientRect();
      textarea.style.left = elemRect.left + 'px';
      textarea.style.top = elemRect.top + 'px';
      data.shortcutsEnabled.next(false);
      let text = '';
      textarea.oninput = (e) => {
        text = (e.target as any).value;
      };
      const finishTextInsertion = (e: any) => {
        if (e.code == 'Enter') {
          this.textElem.textContent = text;
          disableTextEditing();
        } else if (e.code == 'Escape') {
          disableTextEditing();
        }
      };
      const disableTextEditing = () => {
        textarea.remove();
        document.removeEventListener('keydown', finishTextInsertion);
        document.removeEventListener('mousedown', checkForClickOutsideElem);
        data.shortcutsEnabled.next(true);
      };
      const checkForClickOutsideElem = (e: any) => {
        if (!this.contains(e.target)) {
          disableTextEditing();
        }
      };
      document.addEventListener('keydown', finishTextInsertion);
      document.addEventListener('mousedown', checkForClickOutsideElem);
      this.elem.appendChild(textarea);
    });
  }

  setText(text: string) {
    const textObj = this.Obj();
    textObj.text = text;
    this.renderApp();
  }
  private renderApp() {
    this.app.render();
  }

  private Obj() {
    return this.app.stage.getChildByName(this.id) as PIXI.Text;
  }

  setColor(color: string) {
    this.Obj().style.fill = color;
    this.renderApp();
  }
  setFontFamily(family: string) {}
  setFontSize(size: number) {}
}
