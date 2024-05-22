import { Injectable, Renderer2 } from '@angular/core';
import { ShapeToolService } from './shape-tool.service';

@Injectable({
  providedIn: 'root',
})
export class ToolService {
  renderer?: Renderer2;
  tools: any[] = [];
  constructor() {}
  register(tool: any) {
    if (!this.tools.includes(tool)) {
      this.tools = tool;
    }
  }
  disconfigureTools() {
    for (let i = 0; i < this.tools.length; i++) {
      const tool = this.tools[i];
      tool.disconfigure();
    }
  }
}
