import { Component, Input } from '@angular/core';
import { TypeLayer } from 'src/app/core/layers/type-layer';

@Component({
  selector: 'app-type-layer-property',
  templateUrl: './type-layer-property.component.html',
  styleUrls: ['./type-layer-property.component.scss'],
})
export class TypeLayerPropertyComponent {
  @Input() selectedLayer?: any;
  textAlign: 'right' | 'left' | 'center' = 'right';
  onXChange(x: any) {
    this.selectedLayer.elem.style.left = x + 'px';
  }
  onYChange(y: any) {
    this.selectedLayer.elem.style.top = y + 'px';
  }
  onWidthChange(width: any) {
    this.selectedLayer.elem.style.width = width + 'px';
  }
  onHeightChange(height: any) {
    this.selectedLayer.elem.style.height = height + 'px';
  }

  onLineHeightChange($event: string) {
    throw new Error('Method not implemented.');
  }
  onFontFamilyChange(familiy: string) {
    if (this.selectedLayer instanceof TypeLayer) {
      this.selectedLayer.textElem.style.fontFamily = familiy;
    }
  }
  onTextSizeChange(size: number) {
    if (this.selectedLayer instanceof TypeLayer) {
      this.selectedLayer.textElem.style.fontSize = size + 'px';
    }
  }
  setTextAlignment(align: 'right' | 'left' | 'center') {
    if (this.selectedLayer instanceof TypeLayer) {
      this.selectedLayer.textElem.style.textAlign = align;
      this.textAlign = align;
    }
  }
  onFillChange(e: any) {
    this.selectedLayer.elem.style.color = e.target.value;
  }
  onStrokeChange(e: any) {
    this.selectedLayer.elem.style.border = `solid ${e.target.value}`;
  }
  onStrokeWidthChange(width: string) {}
}
