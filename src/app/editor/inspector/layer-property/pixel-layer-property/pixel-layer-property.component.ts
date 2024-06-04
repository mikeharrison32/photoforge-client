import { Component, Input, OnInit } from '@angular/core';
import { PixelLayer } from 'src/app/core/layers/pixel-layer';

@Component({
  selector: 'app-pixel-layer-property',
  templateUrl: './pixel-layer-property.component.html',
  styleUrls: ['./pixel-layer-property.component.scss'],
})
export class PixelLayerPropertyComponent {
  @Input() selectedLayer!: PixelLayer;

  onXChange(x: any) {
    this.selectedLayer.elem.style.left = x + 'px';
  }
  onYChange(y: any) {
    this.selectedLayer.elem.style.top = y + 'px';
  }
  onWidthChange(width: any) {
    this.selectedLayer.setWidth(width);
    // this.selectedLayer.elem.style.width = width + 'px';
  }
  onHeightChange(height: any) {
    this.selectedLayer.elem.style.height = height + 'px';
  }

  rotate(dir: 'left' | 'right') {
    const angle = this.selectedLayer.angle;
    let newAngle;
    switch (dir) {
      case 'left':
        //0 -> 90 -> 180 -> 360
        newAngle =
          angle == 0
            ? 90
            : angle == 90
            ? 180
            : angle == 180
            ? 360
            : angle == 360
            ? 0
            : 0;
        this.selectedLayer.setAngle(newAngle);

        break;
      case 'right':
        newAngle =
          angle == 0
            ? -90
            : angle == -90
            ? -180
            : angle == -180
            ? -360
            : angle == -360
            ? -0
            : 0;

        this.selectedLayer.setAngle(newAngle);
    }
  }
  flipX() {
    let currentFlipX = this.selectedLayer.flipX ? false : true;
    this.selectedLayer.elem.style.transform = `scaleX(${
      currentFlipX ? -1 : 1
    })`;
    this.selectedLayer.flipX = currentFlipX;
  }
  flipY() {
    let currentFlipY = this.selectedLayer.flipY ? false : true;

    this.selectedLayer.elem.style.transform = `scaleY(${
      currentFlipY ? -1 : 1
    })`;
    this.selectedLayer.flipY = currentFlipY;
  }
}
