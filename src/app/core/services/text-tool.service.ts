import { Injectable, Renderer2 } from '@angular/core';
import { TypeLayer } from '../layers/type-layer';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class TextToolService {
  mouseDownListener!: (e: any) => void;
  data?: DataService;
  constructor() {}
  configure(display: HTMLElement, data: DataService, renderer: Renderer2) {
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
  addText(text: string, renderer: Renderer2, data: DataService) {
    const typeLayer = new TypeLayer(
      renderer,
      data,
      `${Math.random()}`,
      'Text',
      data.selectedProject.getValue()?.Id || 'aaa',
      text,
      {
        fontSize: 87,
      }
    );
    data.layers.next([...data.layers.getValue(), typeLayer]);
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
