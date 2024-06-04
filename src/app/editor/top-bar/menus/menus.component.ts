import {
  Component,
  ViewChild,
  ElementRef,
  HostListener,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  Renderer2,
  Input,
} from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { Menus } from 'src/app/enums/menu.enum';
import { LayerService } from 'src/app/core/services/layer.service';
import { Filter } from 'src/app/enums/filter';
import { Project } from 'src/app/types/project';
import { StateService } from 'src/app/core/services/state.service';
import { ClipboardService } from 'src/app/core/services/clipboard.service';
import { ApiService } from 'src/app/core/services/api.service';
import { PixelLayer } from 'src/app/core/layers/pixel-layer';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Layer } from 'src/app/core/layers/layer';
import { AdjustmentLayer } from 'src/app/types/layer';
import * as PIXI from 'pixi.js-legacy';
import { Command } from 'src/app/core';
import { settings } from 'src/app/settings/settings';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss'],
})
export class MenusComponent implements OnInit, OnDestroy {
  @ViewChild('menuOptions') menuOptions!: ElementRef;
  @ViewChild('open') open!: ElementRef;
  @ViewChild('menus') menus!: ElementRef;
  @ViewChild('appMenu') appMenu!: ElementRef;
  @Input() display?: HTMLElement;
  selectedMenu: Menus = Menus.None;
  recentProjects: Project[] = [];
  visible: boolean = false;

  get settings() {
    return settings;
  }
  constructor(
    private data: DataService,
    private layerService: LayerService,
    private stateService: StateService,
    private clipboard: ClipboardService,
    private api: ApiService,
    private notification: NotificationService,
    private renderer: Renderer2,
    private router: Router,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    //TODO:
    //sort the projects based on their modifyed date
    //reverse the array
    //then get the first few project and display
    this.recentProjects = this.data.projects.getValue();
  }

  @HostListener('document:click', ['$event'])
  onClickOutsizeMenus(e: MouseEvent) {
    if (
      !this.menus.nativeElement.contains(e.target) ||
      !this.appMenu.nativeElement.contains(e.target)
    ) {
      // this.visible = false;
    }
  }
  backToHome() {
    //check if the the project is saved otherwise warn the user
    this.router.navigateByUrl('/start');
  }
  async saveProject() {
    // project.pfd
    //send a save project req
    //the server takes the info
    //create a [projectname].pfd file
    //convert the data to binary the append it to the file
    //sends the file back to the client to download it
    //then whenever the user uploades a pfd file the it gets send to the server and the server converts the binary into json and send it back...
  }
  get Menus() {
    return Menus;
  }
  get Filter() {
    return Filter;
  }
  get AdjustmentLayer() {
    return AdjustmentLayer;
  }
  onMenuClick(menu: Menus) {
    this.selectedMenu = menu;
  }
  onNewMenuClick() {
    this.closeMenu();
    this.data.newMenuClick.next(true);
  }
  closeMenu() {
    this.visible = false;
  }
  openProject(project: Project) {
    this.router.navigateByUrl(`editor/${project.Id}`);
  }
  onOpenFileOptionChange(e: any) {}

  placeEmbedded(e: any) {
    const file = e.target.files[0];
    const openedProject = this.data.openedProject.getValue();
    if (!openedProject) {
      return;
    }
    this.api
      .uploadLayer(openedProject.Id, file)
      .then((layer: any) => {
        console.log(layer);

        const imageResult = firstValueFrom(
          this.http.get(layer.url, { responseType: 'blob' })
        );
        imageResult.then((res: Blob) => {
          this.layerService.createLayerObj(this.renderer, layer, res);
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.closeMenu();
  }
  clearProject() {}
  pasteObj() {
    this.clipboard.pasteLayer();
  }
  copySelectedObj() {
    this.clipboard.copyLayer(this.data.selectedLayers.getValue()[0]);
  }
  deleteLayer() {
    const updatedLayers: Layer[] = [];
    const selectedLayers = this.data.selectedLayers.getValue();
    this.data.layers.getValue().forEach((l) => {
      if (!selectedLayers.includes(l)) {
        updatedLayers.push(l);
      }
    });
    this.data.layers.next(updatedLayers);
  }
  async duplicateLayer() {
    const selectedLayers = this.data.selectedLayers.getValue();
    const openedProject = this.data.openedProject.getValue();
    selectedLayers.forEach(async (sl: Layer) => {
      if (sl instanceof PixelLayer) {
        const duplicateLayer = new PixelLayer(
          this.data,
          this.renderer,
          `${Math.random()}`,
          sl.name + ' Copy',
          openedProject!.Id
        );
        duplicateLayer.setWidth(sl.width);
        duplicateLayer.setHeight(sl.height);
        const ctx = await sl.get2DContext();
        const imgData = ctx?.getImageData(0, 0, sl.width, sl.height);
        duplicateLayer.insertImageData(imgData!, 0, 0);
        this.data.layers.next([...this.data.layers.getValue(), duplicateLayer]);
      }
    });
  }
  async createNewLayer() {
    const selectedProject = this.data.selectedProject.getValue();
    const layer = new PixelLayer(
      this.data,
      this.renderer,
      `${Math.random()}`,
      'Layer 1',
      this.data.openedProject.getValue()?.Id || 'aaa'
    );
    layer.setWidth(this.display?.clientWidth || 200);
    layer.setHeight(this.display?.clientHeight || 200);

    const ctx = await layer.get2DContext();
    ctx?.fillRect(0, 0, 300, 300);
    this.data.layers.next([...this.data.layers.getValue(), layer]);
    this.data.selectedLayers.next([
      ...this.data.selectedLayers.getValue(),
      layer,
    ]);
  }
  addFilter(filter: Filter) {
    // this.layer.addFilter(filter);
  }
  flipCanvas() {
    this.data.layers.subscribe((layers) => {
      layers.forEach((lr) => {
        // lr.canvas!.style.scale = '-1 1';
      });
    });
  }
  closeSelectedProject() {
    const currentProjectsValue = this.data.projects.getValue();
    const updatedProjectsValue: Project[] = [];
    currentProjectsValue.forEach((p) => {
      if (p.Id != this.data.selectedProject.value?.Id) {
        updatedProjectsValue.push(p);
      }
    });
    this.data.projects.next(updatedProjectsValue);
    if (this.data.projects.value.length > 0) {
      this.data.selectedProject.next(this.data.projects.value[0]);
    } else {
      this.data.selectedProject.next(null);
    }
    this.closeMenu();
  }

  fill() {
    throw new Error('Method not implemented.');
  }
  cut() {
    this.clipboard.cutLayer(this.data.selectedLayers.value[0]);
  }
  redo() {}
  stepBackward() {}
  undo() {
    this.stateService.undo();
  }
  swatchesPanel() {
    throw new Error('Method not implemented.');
  }
  propertiesPanel() {
    throw new Error('Method not implemented.');
  }
  layersPanel() {
    throw new Error('Method not implemented.');
  }
  colorPanel() {
    throw new Error('Method not implemented.');
  }
  characterPanel() {
    throw new Error('Method not implemented.');
  }
  brushesPanel() {
    throw new Error('Method not implemented.');
  }
  adjustmentsPanel() {
    const visible = settings.panals.adjustments.visible;
    settings.panals.adjustments.visible = visible ? false : true;
    console.log(settings.panals.adjustments.visible);
  }
  revealAll() {
    throw new Error('Method not implemented.');
  }
  rotateCanvas() {
    this.data.layers.subscribe((layers) => {
      layers.forEach((lr) => {
        // lr.canvas!.style.transform = 'rotate(180deg)';
      });
    });
  }
  crop() {
    this.data.selectedToolGroup.next('cropTool');
  }
  flipVertical() {}
  flipHorizontal() {
    throw new Error('Method not implemented.');
  }
  rotateView() {
    throw new Error('Method not implemented.');
  }
  show() {
    throw new Error('Method not implemented.');
  }
  printSize() {
    throw new Error('Method not implemented.');
  }
  actualPixels() {
    throw new Error('Method not implemented.');
  }
  fitOnScreen() {
    throw new Error('Method not implemented.');
  }
  zoomOut() {
    this.data.zoom.next(this.data.zoom.getValue() - 2);
  }
  zoomIn() {
    this.data.zoom.next(this.data.zoom.getValue() + 2);
  }
  saveSlectionChannel() {
    throw new Error('Method not implemented.');
  }
  loadSelectionChannel() {
    throw new Error('Method not implemented.');
  }
  modify() {
    throw new Error('Method not implemented.');
  }
  saveSelection() {
    throw new Error('Method not implemented.');
  }
  loadSelection() {
    throw new Error('Method not implemented.');
  }
  deselectLayers() {
    throw new Error('Method not implemented.');
  }
  inverse() {
    const selectedLayers = this.data.selectedLayers.getValue();
    const allLayers = this.data.layers.getValue();
    const unselectedLayers: Layer[] = [];
    allLayers.forEach((lr) => {
      if (!selectedLayers.includes(lr)) {
        unselectedLayers.push(lr);
      }
    });
    this.data.selectedLayers.next(unselectedLayers);
  }
  reselect() {
    throw new Error('Method not implemented.');
  }
  deselect() {
    this.data.selectedLayers.next([]);
  }
  selectAll() {
    this.data.selectedLayers.next(this.data.layers.getValue());
  }
  // transformSelection() {
  //   throw new Error('Method not implemented.');
  // }
  // fontPreview() {
  //   throw new Error('Method not implemented.');
  // }
  // typeOrientation() {
  //   throw new Error('Method not implemented.');
  // }
  // typeOnAPath() {
  //   throw new Error('Method not implemented.');
  // }
  // matchFont() {
  //   throw new Error('Method not implemented.');
  // }
  // simplifyText() {
  //   throw new Error('Method not implemented.');
  // }
  // convertToShape() {
  //   throw new Error('Method not implemented.');
  // }
  // createWorkPath() {
  //   throw new Error('Method not implemented.');
  // }
  // verticalTypeMaskTool() {
  //   throw new Error('Method not implemented.');
  // }
  // horizontalTypeMaskTool() {
  //   throw new Error('Method not implemented.');
  // }

  newTypeLayer() {}
  layerViaCut() {
    throw new Error('Method not implemented.');
  }
  layerViaCopy() {
    throw new Error('Method not implemented.');
  }
  createClippingMask() {
    throw new Error('Method not implemented.');
  }
  lockLayers() {
    throw new Error('Method not implemented.');
  }
  distribute() {
    throw new Error('Method not implemented.');
  }
  align() {
    throw new Error('Method not implemented.');
  }
  arrange() {
    throw new Error('Method not implemented.');
  }
  flattenImage() {
    throw new Error('Method not implemented.');
  }
  mergeLayers() {
    throw new Error('Method not implemented.');
  }
  unGroupLayers() {
    throw new Error('Method not implemented.');
  }
  groupLayers() {
    throw new Error('Method not implemented.');
  }
  groupLayer() {
    throw new Error('Method not implemented.');
  }
  transform() {
    throw new Error('Method not implemented.');
  }
  stroke() {
    throw new Error('Method not implemented.');
  }
  autoTone() {}
  autoContrast() {}
  autoColor() {}
  applyImage() {}
  addAdjustmentLayer(aj: any) {}
  ngOnDestroy(): void {}
}
