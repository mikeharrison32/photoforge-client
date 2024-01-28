export class ContextMenu {
  private menus: Menu[] = [];
  contextMenuElem: HTMLDivElement;
  constructor(parent: HTMLElement, x: number, y:number) {
    this.contextMenuElem = document.createElement('div');
    this.contextMenuElem.classList.add("context-menu")
    this.contextMenuElem.style.display = 'none';
    this.contextMenuElem.style.position = 'absolute';
    this.contextMenuElem.style.top = y+"px";
    this.contextMenuElem.style.left = x+"px";
    parent.appendChild(this.contextMenuElem)
  }
  addMenus(...menus: Menu[]){
    menus.forEach(menu => {
      this.contextMenuElem.appendChild(menu.elem!)
    })
  }
  show() {
    this.contextMenuElem.style.display = 'block';
  }
  hide() {
    this.contextMenuElem.style.display = 'none';
  }
}


export class Menu {
  elem?: HTMLDivElement
  constructor(name: string){
    this.elem = document.createElement("p")
    this.elem.textContent = name 
  }
  onClick(cb: Function){
    this.elem?.addEventListener("click", e=> {
      cb(e)
    })
  }
}