export class PFElement {
  protected _elem!: HTMLElement
  constructor(type: string) {
    this._elem = document.createElement(type)
  }
  getElem(){return this._elem}
  addClassName(cn: string){
    this._elem.classList.add(cn)
  }
  setStyles(){

  }
}

