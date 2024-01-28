import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-brush',
  templateUrl: './brush.component.html',
  styleUrls: ['./brush.component.scss'],
})
export class BrushComponent {
  brushSize: number = 10;
  brushAdjustmentsActive: boolean = false;
  @Output() brushSizeChange = new EventEmitter<number>();
  toggleBrushAdjustments() {
    this.brushAdjustmentsActive = this.brushAdjustmentsActive ? false : true;
  }
  onBrushSizeChange(size: number) {
    this.brushSize = size;
    this.brushSizeChange.emit(this.brushSize);
  }
}
