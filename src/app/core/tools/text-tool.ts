import { TypeLayer } from '../layers/type-layer';
import { DataService } from '../services/data.service';

export class TextTool {
  properties: ITextToolOptions = {};
  type: string = 'textTool';
  data?: DataService;
  textArea?: HTMLElement;
  configure(display: HTMLElement, data: DataService) {
    this.data = data;
    data.shortcutsEnabled.next(false);
    display.style.cursor = 'text';
    display.addEventListener('mousedown', (e) => {
      // if (!this.textArea) {
      //   this.textArea = document.createElement('textarea');
      //   display.appendChild(this.textArea);
      // }
      // this.textArea.classList.add('textarea');
      // const rect = this.textArea.getBoundingClientRect();
      // this.textArea.style.left = e.clientX - rect!.left + 'px';
      // this.textArea.style.top = e.clientY + 'px';
      if ((e.target as HTMLElement).id != 'typeLayer') {
        const textLayer = new TypeLayer(
          display,
          `${Math.random()}`,
          'Type layer 1',
          data.selectedProject.getValue()?.Id || 'aaa'
        );

        const textLayerRect = textLayer.canvas?.getBoundingClientRect()!;
        const displayScale = parseFloat(display.style.scale || '1');
        textLayer.moveTo(
          (e.clientX - textLayerRect.left - textLayerRect.width / 2) /
            displayScale,
          (e.clientY - textLayerRect.top - textLayerRect.height / 2) /
            displayScale
        );

        textLayer.setColor(this.properties?.color || '#000');
        data.layers.next([...data.layers.getValue(), textLayer]);
      }
    });
  }

  disconfigure(display: HTMLElement): void {
    display.style.cursor = 'default';
    this.textArea?.remove();
    this.data?.shortcutsEnabled.next(true);
  }
}

export const textTool = new TextTool();

export interface ITextToolOptions {
  fontFamily?: string;
  fontStyle?: string;
  fontSize?: number;
  color?: string;
}
