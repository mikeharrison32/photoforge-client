import { ContextMenu, Menu } from "../../context-menu";
import { MouseDragEvent } from "../../event";
import { Layer } from "../../layers/layer";
import { PixelLayer } from "../../layers/pixel-layer";
import { DataService } from "../../services/data.service";

class ReactangularSelect {
  properites?: IRectangularProperties;
  contextMenu?: ContextMenu;
  rect?: HTMLElement
  type: string = "rectangularSelectTool"
  configure(display: HTMLElement, selectedLayer: PixelLayer, data: DataService): void {
    console.log("rect seleect configured")
    let startLeft = 0
    let startTop = 0
    display.addEventListener("mousedown", e => {
      this.rect?.remove()
      this.rect = document.createElement("div")
      this.rect.classList.add("selection-rect")
      let rectBox = this.rect.getBoundingClientRect()
      let scale = parseFloat(display.style.scale || "1")

      this.rect.style.left = (e.x - rectBox.left) / scale + "px"
      this.rect.style.top = (e.y - rectBox.top) / scale + "px"
      startLeft = e.x 
      startTop = e.y
      display.appendChild(this.rect)
      this.setUpContextMenu(display, 0, 0, this.rect, selectedLayer, data)
    })
    new MouseDragEvent(display, true,(e: any) => {
      if(!this.rect){return}
         console.log("drawing rect seleect configured,", e.x, e.y)
        this.rect.style.left = startLeft + "px"
        this.rect.style.top = startTop + "px"
        let scale = parseFloat(display.style.scale)
        let rectBox = this.rect.getBoundingClientRect()
        let displayRectBox = this.rect.getBoundingClientRect()

        this.rect.style.width = (e.x + displayRectBox.left - rectBox.left)  / scale + "px"
        this.rect.style.height = e.y / scale + "px"
    
    }) 

    display.addEventListener("keydown", e => {
      if(e.code == "Enter"){
        if(this.rect){
          this.applySelection(this.rect)
        }
      }
    })

    this.rect?.addEventListener("contextmenu", e => {
      e.preventDefault()
      if(this.rect?.contains(e.target as any)){
        this.contextMenu?.show()
      }else {
        this.contextMenu?.hide()
      }
    })
  }
  applySelection(rect: HTMLElement) {
    if(!rect){return}
   
  }
  setUpContextMenu(display: HTMLElement, x:number, y:number,rect: HTMLElement, selectedLayer: Layer, data: DataService){
    this.contextMenu = new ContextMenu(display, x - rect.getBoundingClientRect().left, y - rect.getBoundingClientRect().top)
    const layerViaCopy = new Menu("Layer Via Copy")
    layerViaCopy.onClick(() => {
      const new_layer_imgdata =  selectedLayer.ctx?.getImageData(rect.clientLeft, rect.clientTop, rect.clientWidth, rect.clientHeight)
      const layer = new PixelLayer(display, `${Math.random()}`, "Layer 1" , "aaa", new_layer_imgdata)
      data.layers.next([...data.layers.getValue(), layer])
    })
    const layerViaCut = new Menu("Layer Via Cut")
    layerViaCut.onClick(() => {
      const new_layer_imgdata =  selectedLayer.ctx?.getImageData(rect.clientLeft, rect.clientTop, rect.clientWidth, rect.clientHeight)
      const layer = new PixelLayer(display, `${Math.random()}`, "Layer 1" , "aaa", new_layer_imgdata)
      data.layers.next([...data.layers.getValue(), layer])

      selectedLayer.ctx?.putImageData(new ImageData(rect.clientWidth, rect.clientHeight), rect.clientLeft, rect.clientTop)
    })
    this.contextMenu.addMenus(layerViaCopy, layerViaCut)
  }
  disconfigure(display: HTMLElement): void {
    this.rect?.remove()
  }
}


interface IRectangularProperties {
  feather?: number;
  antiAlias?: boolean;
  style?: string;
  width?: number;
  height?: number;
}

export const rectangularSelect = new ReactangularSelect();



