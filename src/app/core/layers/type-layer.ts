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
    containerElem: HTMLElement,
    data: DataService,
    id: string,
    name: string,
    projectId: string,
    text?: string,
    options?: ITextToolOptions
  ) {
    super(renderer, containerElem, data, id, name, projectId);
    this.type = 'type';
    this.textElem = this.renderer.createElement('p');
    this.textElem.textContent = text || 'Hello';
    this.renderer.appendChild(this.elem, this.textElem);
    this.resizer.setWidth(this.elem.clientWidth);
    this.resizer.setHeight(this.elem.clientHeight);
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
