import * as PIXI from 'pixi.js-legacy';
import { Layer } from './layer';
import { ITextToolOptions } from '../tools';
import { Renderer2 } from '@angular/core';
import { DataService } from '../services/data.service';
export class TypeLayer extends Layer {
  app!: PIXI.Application;
  textarea?: HTMLTextAreaElement;
  properties: ITextToolOptions = {
    textAlign: 'left',
  };
  textElem!: HTMLElement;
  constructor(
    renderer: Renderer2,
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
    this.textElem.style.fontSize = (options?.fontSize || 87) + 'px';
    this.renderer.appendChild(this.elem, this.textElem);
    this.resizer.setWidth(this.elem.clientWidth);
    this.resizer.setHeight(this.elem.clientHeight);

    renderer.listen(this.elem, 'dblclick', (e) => {
      // this.elem.style.opacity = '0';
      if (!this.textarea) {
        this.textarea = document.createElement('textarea');
        this.textarea.style.fontSize = this.textElem.style.fontSize;
        this.textarea.style.color = this.elem.style.color;
        this.textarea.style.fontFamily = this.textElem.style.fontFamily;
      }
      this.textElem.style.opacity = '0';
      this.textarea.value = this.textElem.textContent || '';
      this.textarea.select();
      this.textarea.classList.add('textarea');
      data.shortcutsEnabled.next(false);
      let text = this.textarea.value;
      this.textarea.oninput = (e) => {
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
        this.textElem.style.opacity = '1';
        this.textarea?.remove();
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
      renderer.appendChild(this.elem, this.textarea);
    });
    renderer.listen(document, 'click', (e) => {
      const target = e.target;
      if (!this.elem.contains(target) && this.textarea) {
        this.textarea.remove();
      }
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
