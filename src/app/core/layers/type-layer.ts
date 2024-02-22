import * as PIXI from 'pixi.js-legacy';
import { Layer } from './layer';
import { ITextToolOptions } from '../tools';
export class TypeLayer extends Layer {
  app!: PIXI.Application;
  textarea?: HTMLElement;
  options?: ITextToolOptions;
  constructor(
    containerElem: HTMLElement,
    id: string,
    name: string,
    projectId: string,
    text?: string,
    options?: ITextToolOptions
  ) {
    super(containerElem, id, name, projectId, true);
    if (text) {
      this.setWidth(text.length);
      this.setHeight(10);
    }
    this.canvas!.id = 'typeLayer';
    this.app = new PIXI.Application({
      view: this.canvas as HTMLCanvasElement,
      width: 100,
      height: 50,
      background: 'transparent',
      backgroundAlpha: 0,
      backgroundColor: 'transparent',
    });

    const textObj = new PIXI.Text('Lorem ipsum');
    textObj.name = id;
    this.app.stage.addChild(textObj);

    this.canvas?.addEventListener('click', (e) => {
      if (!this.textarea) {
        this.textarea = document.createElement('textarea');
        this.textarea.classList.add('textarea');
        containerElem.appendChild(this.textarea);
        const canvasRect = this.canvas?.getBoundingClientRect()!;
        this.textarea.style.left =
          this.canvas!.clientLeft + this.canvas!.offsetLeft + 'px';
        this.textarea.style.top = canvasRect.top + 'px';
        this.textarea.focus();
        this.canvas!.style.display = 'none';

        let text = '';
        this.textarea.addEventListener('input', (e: any) => {
          text = text.concat(e.data);
        });

        this.textarea.addEventListener('keydown', (e) => {
          if (e.code == 'Enter') {
            this.setText(text);
            this.canvas!.style.display = 'block';
            this.textarea?.remove();
          }
        });
      }
    });
  }
  setText(text: string) {
    const textObj = this.getTextObj();
    textObj.text = text;
    this.renderApp();
  }
  private renderApp() {
    this.app.render();
  }

  private getTextObj() {
    return this.app.stage.getChildByName(this.id) as PIXI.Text;
  }

  setColor(color: string) {
    this.getTextObj().style.fill = color;
    this.renderApp();
  }
  setFontFamily(family: string) {}
  setFontSize(size: number) {}
}
