import { Renderer2 } from '@angular/core';
import { TypeLayer } from '../layers/type-layer';
import { DataService } from '../services/data.service';
export class TextTool {
  properties: ITextToolOptions = {};
  type: string = 'textTool';
  data?: DataService;
  textArea?: HTMLElement;
  configure(display: HTMLElement, data: DataService, renderer: Renderer2) {
    this.data = data;
    data.shortcutsEnabled.next(false);
    display.style.cursor = 'text';
    display.addEventListener('mousedown', (e) => {
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
    });
  }

  disconfigure(display: HTMLElement): void {
    display.style.cursor = 'default';
    this.data?.shortcutsEnabled.next(true);
    display.removeEventListener('mousedown', (e) => {});
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
