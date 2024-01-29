import {
  Component,
  ViewChild,
  ElementRef,
  HostListener,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { Menus } from 'src/app/enums/menu.enum';
import { LayerService } from 'src/app/core/services/layer.service';
import { Filter } from 'src/app/enums/filter';
import { Project } from 'src/app/types/project';
import { StateService } from 'src/app/core/services/state.service';
import { ClipboardService } from 'src/app/core/services/clipboard.service';
import { ApiService } from 'src/app/core/services/api.service';
import { ImageCanvas } from 'src/app/core/image-canvas';
import { PixelLayer } from 'src/app/core/layers/pixel-layer';
import { rgbaFormatter } from 'src/app/core/rgba-formater';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Layer } from 'src/app/core/layers/layer';
import { AdjustmentLayer } from 'src/app/types/layer';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss'],
})
export class MenusComponent implements OnInit, OnDestroy {
  @ViewChild('menuOptions') menuOptions!: ElementRef;
  @ViewChild('open') open!: ElementRef;
  @ViewChild('menus') menus!: ElementRef;
  selectedMenu: Menus = Menus.None;
  recentProjects: Project[] = [];
  constructor(
    private data: DataService,
    private layer: LayerService,
    private stateService: StateService,
    private clipboard: ClipboardService,
    private api: ApiService,
    private notification: NotificationService
  ) {}
  ngOnInit(): void {
    //TODO:
    //sort the projects based on their modiyed date
    //reverse the array
    //then get the first few project and display
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
    this.selectedMenu = Menus.None;
  }
  openProject(project: Project) {
    this.data.projects.next([...this.data.projects.getValue(), project]);
    this.data.selectedProject.next(project);
  }
  onOpenFileOptionChange(e: any) {
    for (let file of e.target.files) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const imgObj = new Image();
        imgObj.src = event.target.result;
        this.notification.createNotification({
          title: 'Opening image ' + file.name,
        });
        imgObj.onload = () => {
          this.notification.hideNotification();
          const project: Project = {
            Id: `${Math.random()}`,
            Title: file.name,
            UserId: 'dasd',
            Width: imgObj.width,
            Height: imgObj.height,
          };
          const displayElem = this.data.displayElem.getValue();
          displayElem!.style.width = imgObj.width + 'px';
          displayElem!.style.height = imgObj.height + 'px';
          const pixelLayer = new PixelLayer(
            displayElem,
            'aaa',
            file.name,
            project.Id,
            imgObj
          );
          this.data.layers.next([...this.data.layers.getValue(), pixelLayer]);
          this.data.projects.next([...this.data.projects.getValue(), project]);
          this.data.selectedProject.next(project);
        };
      };
      this.api.createProjectByUpload(file).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
      reader.readAsDataURL(file);
    }
    this.closeMenu();
  }
  clearProject() {
    const selectedProject = this.data.selectedProject.getValue();
    const updatedLayers: Layer[] = [];
    this.data.layers.getValue().forEach((l) => {
      if (l.projectId != selectedProject?.Id) {
        updatedLayers.push(l);
      } else {
        l.canvas?.remove();
      }
    });
    this.data.layers.next(updatedLayers);
  }
  pasteObj() {
    this.clipboard.pasteLayer();
  }
  copySelectedObj() {
    this.clipboard.copyLayer(this.data.selectedLayers.value[0]);
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
  duplicateLayer() {
    const selectedLayers = this.data.selectedLayers.getValue();
    const selectedProject = this.data.selectedProject.getValue();
    const displayElem = this.data.displayElem.getValue();
    selectedLayers.forEach((sl: Layer) => {
      if (sl instanceof PixelLayer) {
        const duplicateLayer = new PixelLayer(
          displayElem,
          `${Math.random()}`,
          sl.name + 'Copy',
          selectedProject!.Title,
          null
        );
        this.data.layers.next([...this.data.layers.getValue(), duplicateLayer]);
      }
    });
  }
  createNewLayer() {
    const displayElem = this.data.displayElem.getValue();
    const layer = new PixelLayer(
      displayElem,
      `${Math.random()}`,
      'Layer 1',
      'aaa',
      new ImageData(displayElem!.clientWidth, displayElem!.clientHeight)
    );
    this.data.layers.next([...this.data.layers.getValue(), layer]);
    this.data.selectedLayers.next([
      ...this.data.selectedLayers.getValue(),
      layer,
    ]);
  }
  addFilter(filter: Filter) {
    // this.layer.addFilter(filter);
  }
  flipCanvas() {}
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
  placeEmbedded(e: any) {
    for (let file of e.target.files) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const imgObj = new Image();
        imgObj.src = event.target.result;
        const selectedProject = this.data.selectedProject.getValue();
        imgObj.onload = () => {
          const displayElem = this.data.displayElem.getValue();
          const pixelLayer = new PixelLayer(
            displayElem,
            'ede',
            file.name,
            selectedProject?.Id || 'aaa',
            imgObj
          );
          this.data.layers.next([...this.data.layers.getValue(), pixelLayer]);
        };
      };
      reader.readAsDataURL(file);
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
  undo() {}
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
    throw new Error('Method not implemented.');
  }
  revealAll() {
    throw new Error('Method not implemented.');
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
    throw new Error('Method not implemented.');
  }
  zoomIn() {
    throw new Error('Method not implemented.');
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
    throw new Error('Method not implemented.');
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
  transformSelection() {
    throw new Error('Method not implemented.');
  }
  fontPreview() {
    throw new Error('Method not implemented.');
  }
  typeOrientation() {
    throw new Error('Method not implemented.');
  }
  typeOnAPath() {
    throw new Error('Method not implemented.');
  }
  matchFont() {
    throw new Error('Method not implemented.');
  }
  simplifyText() {
    throw new Error('Method not implemented.');
  }
  convertToShape() {
    throw new Error('Method not implemented.');
  }
  createWorkPath() {
    throw new Error('Method not implemented.');
  }
  verticalTypeMaskTool() {
    throw new Error('Method not implemented.');
  }
  horizontalTypeMaskTool() {
    throw new Error('Method not implemented.');
  }
  verticalTypeTool() {
    throw new Error('Method not implemented.');
  }
  horizontalTypeTool() {
    throw new Error('Method not implemented.');
  }
  newTypeLayer() {
    throw new Error('Method not implemented.');
  }
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
  ngOnDestroy(): void {
    this.data.canvas.unsubscribe();
  }
}
