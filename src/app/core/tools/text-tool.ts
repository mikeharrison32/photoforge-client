import { Renderer2 } from '@angular/core';
import { TypeLayer } from '../layers/type-layer';
import { DataService } from '../services/data.service';
export class TextTool {
  properties: ITextToolOptions = {};
  readonly type: string = 'textTool';
  data?: DataService;
  textArea?: HTMLElement;
  mouseDownListener!: (e: any) => void;
  configure(display: HTMLElement, data: DataService, renderer: Renderer2) {
    this.data = data;
    display.style.cursor = 'text';
    this.mouseDownListener = (e: MouseEvent) => {
      const displayScale = parseFloat(display.style.scale || '1');
      const clickedElem = e.target as HTMLElement;
      const typeLayers = data.layers
        .getValue()
        .filter((layer) => layer.type == 'type');
      const isClickedOnTypeLayer = typeLayers.find((layer) =>
        layer.contains(clickedElem)
      );
      if (isClickedOnTypeLayer) {
        return;
      }
      const typeLayer = new TypeLayer(
        renderer,
        data,
        `${Math.random()}`,
        'Text',
        data.selectedProject.getValue()?.Id || 'aaa',
        'Lorem Ipsum',
        {
          fontSize: 87,
        }
      );
      const rect = display.getBoundingClientRect();
      const zoom = data.zoom.getValue() / 100;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      typeLayer.moveTo(x / zoom, y / zoom);
      data.layers.next([...data.layers.getValue(), typeLayer]);
      data.selectedLayers.next([typeLayer]);
    };
    display.parentElement?.addEventListener(
      'mousedown',
      this.mouseDownListener
    );
  }

  disconfigure(display: HTMLElement): void {
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
