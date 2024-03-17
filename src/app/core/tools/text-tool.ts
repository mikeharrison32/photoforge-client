import { Renderer2 } from '@angular/core';
import { TypeLayer } from '../layers/type-layer';
import { DataService } from '../services/data.service';
export class TextTool {
  properties: ITextToolOptions = {};
  type: string = 'textTool';
  data?: DataService;
  textArea?: HTMLElement;
  mouseDownListener!: (e: any) => void;
  configure(display: HTMLElement, data: DataService, renderer: Renderer2) {
    this.data = data;
    display.style.cursor = 'text';
    this.mouseDownListener = (e) => {
      const displayScale = parseFloat(display.style.scale || '1');
      const typeLayer = new TypeLayer(
        renderer,
        display,
        data,
        `${Math.random()}`,
        'Text',
        data.selectedProject.getValue()?.Id || 'aaa',
        'Thank\nYou'
      );
      data.layers.next([...data.layers.getValue(), typeLayer]);
    };
    display.parentElement?.addEventListener(
      'mousedown',
      this.mouseDownListener
    );
  }

  disconfigure(display: HTMLElement): void {
    console.log('disconfiguring text tool');
    display.style.cursor = 'default';
    this.data?.shortcutsEnabled.next(true);
    display.parentElement?.removeEventListener(
      'mousedown',
      this.mouseDownListener
    );
  }
}

export const textTool = new TextTool();

export interface ITextToolOptions {
  fontFamily?: string;
  fontStyle?: string;
  fontSize?: number;
  color?: string;
  textAlign?: 'left' | 'right' | 'center';
}
