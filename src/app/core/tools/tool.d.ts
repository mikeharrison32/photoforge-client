import { fabric } from 'fabric';
import { Tool } from 'src/app/enums/tool.enum';

export interface ITool {
  Type: Tool;
  configure(canvas: fabric.Canvas): void;
  setUp(): void;
  disconfigure(): void;
}
