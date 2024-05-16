import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ToolService } from './tool.service';

@Injectable({
  providedIn: 'root',
})
export class ShapeToolService {
  mousedownListener?: () => void;
  constructor(private data: DataService, private toolService: ToolService) {}

  configure(shape: string) {
    const display = this.data.displayElem.getValue();
    if (this.mousedownListener) {
      this.mousedownListener();
    }
    this.mousedownListener = this.toolService.renderer?.listen(
      display,
      'mousedown',
      (e) => {
        console.log('boom', shape);
      }
    );
  }
  disconfigure() {
    if (this.mousedownListener) {
      this.mousedownListener();
    }
  }
}
