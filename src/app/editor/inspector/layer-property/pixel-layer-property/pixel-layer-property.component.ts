import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pixel-layer-property',
  templateUrl: './pixel-layer-property.component.html',
  styleUrls: ['./pixel-layer-property.component.scss'],
})
export class PixelLayerPropertyComponent {
  @Input() selectedLayer?: any;

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
}
