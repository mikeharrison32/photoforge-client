import { ContextMenu, Menu } from '../../context-menu';

const layerViaCopy = new Menu('Layer Via Copy');
layerViaCopy.onClick(() => {});
const layerViaCut = new Menu('Layer Via Cut');
layerViaCut.onClick(() => {});

export class SelectionContextMenu extends ContextMenu {
  constructor(parent: HTMLElement, x?: number, y?: number) {
    super(parent, x || 0, y || 0);
    this.addMenus(layerViaCopy, layerViaCut);
  }
}
