import { Injectable, Renderer2 } from '@angular/core';
import { ShapeToolService } from './shape-tool.service';

@Injectable({
  providedIn: 'root',
})
export class ToolService {
  renderer?: Renderer2;
  constructor() {}
  disconfigureTools() {
    // this.shapeToolService.disconfigure();
  }
}
