import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DataService } from '../core/services/data.service';
import {
  brushTool,
  cloneStampTool,
  cropTool,
  lassoTool,
  rectangularSelect,
  shapeTool,
} from '../core/tools/';
import { Project } from '../types/project';
import { StateService } from '../core/services/state.service';
import { ClipboardService } from '../core/services/clipboard.service';
import { ApiService } from '../core/services/api.service';
import { NotificationService } from '../core/services/notification.service';
import { Layer } from '../core/layers/layer';
import { PixelLayer } from '../core/layers/pixel-layer';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class EditorComponent implements OnInit, AfterViewInit, OnDestroy {
  selectedLayers: Layer[] = [];
  selectedProject?: Project | null;
  layers: Layer[] = [];
  projects: Project[] = [];
  newDocumentActive?: boolean;
  @ViewChild('cursor') cursor?: ElementRef;
  shortcutsRenderFunc = (): void => {};
  shortcutsEnabled?: boolean = true;
  tools: any[] = [
    brushTool,
    shapeTool,
    cropTool,
    rectangularSelect,
    lassoTool,
    cloneStampTool,
  ];
  @ViewChild('display') display?: ElementRef;
  constructor(
    private data: DataService,
    private render: Renderer2,
    private clipboard: ClipboardService,
    private notification: NotificationService
  ) {}
  ngOnInit() {
    this.data.projects.subscribe((projects) => {
      this.projects = projects;
    });
    this.data.layers.subscribe((layers) => {
      this.layers = layers.filter(
        (layer) => layer.projectId == this.selectedProject?.Id
      );
    });
    this.data.selectedProject.subscribe((project) => {
      this.data.layers.getValue().forEach((layer) => {
        if (layer.projectId != project?.Id) {
          layer.hide();
        } else {
          layer.show();
        }
      });
    });
    this.data.newMenuClick.subscribe((clicked) => {
      this.newDocumentActive = clicked;
    });
    this.data.selectedLayers.subscribe((sl) => {
      this.selectedLayers = sl;
    });
  }

  ngAfterViewInit() {
    document.title = 'Editor - Photoforge';
    this.data.displayElem.next(this.display?.nativeElement as HTMLElement);
    this.addShortcuts();
    this.data.selectedTool.next('moveTool');
    this.data.selectedTool.subscribe((selectedTool) => {
      this.tools.forEach((tool) => {
        if (tool.type == selectedTool) {
          console.log('selectedTool', selectedTool);
          this.disconfigureTools();
          switch (tool.type) {
            case 'brushTool':
              tool.configure(
                this.display?.nativeElement,
                this.data,
                this.notification
              );
              break;
            case 'shapeTool':
              tool.configure(
                this.display?.nativeElement,
                this.selectedLayers[0]
              );
              break;
            case 'cropTool':
              tool.configure(this.display?.nativeElement);
              break;
            case 'lassoTool':
              tool.configure(this.display?.nativeElement, this.layers[0]);
              break;
            case 'rectangularSelectTool':
              tool.configure(
                this.display?.nativeElement,
                this.layers[0],
                this.data
              );
              break;
            case 'cloneStampTool':
              tool.configure(this.display?.nativeElement, this.layers[0]);
              break;
            default:
              tool.configure();
          }
          // tool.configure();
        }
      });
    });
    const project: Project = {
      Id: 'ae',
      UserId: 'dss',
      Title: 'dsrfre',
      Width: 720,
      Height: 1080,
    };
    this.data.projects.next([project]);

    this.data.selectedProject.next(project);
    this.display!.nativeElement.style.scale = '0.6';
    const layer = new PixelLayer(
      this.display?.nativeElement,
      'dasd',
      'dasd',
      'ae',
      null
    );
    this.data.layers.next([layer]);
  }

  loadLayers() {}
  registerTools() {
    this.tools.forEach((tool) => {
      switch (tool.type) {
        case 'brushTool':
          tool.configure(this.selectedLayers[0]);
          break;
        default:
          tool.configure();
      }
    });
  }
  addShortcuts() {
    this.shortcutsRenderFunc = this.render.listen(
      'document',
      'keydown',
      (e) => {
        if (!this.shortcutsEnabled) {
          return;
        }
        switch (e.code) {
          case 'KeyM':
            this.data.selectedTool.next('moveTool');
            break;
          case 'KeyA':
            if (e.ctrlKey) {
            }
            break;
          case 'KeyL':
            this.data.selectedTool.next('lassoTool');
            break;
          case 'KeyD':
            if (e.ctrlKey) {
              e.preventDefault();
            }
            break;
          case 'KeyR':
            if (e.ctrlKey) {
              return;
            }
            e.preventDefault();
            this.data.selectedTool.next('rectangularSelectTool');
            break;
          case 'KeyS':
            this.data.selectedTool.next('shapeTool');
            break;
          case 'KeyB':
            this.data.selectedTool.next('brushTool');
            break;
          case 'KeyC':
            if (e.ctrlKey) {
              // this.clipboard.copyLayer(this.selectedLayers![0]);
            } else {
              this.data.selectedTool.next('cropTool');
            }
            break;
          case 'KeyX':
            if (e.ctrlKey) {
              // this.clipboard.cutLayer(this.selectedLayers![0]);
            }
            break;
          case 'KeyT':
            this.data.selectedTool.next('textTool');
            break;
          case 'KeyP':
            this.data.selectedTool.next('penTool');
            break;
          case 'KeyV':
            if (e.ctrlKey) {
              this.clipboard.pasteLayer();
            }
            break;
          case 'KeyE':
            this.data.selectedTool.next('eraserTool');
            break;
          case 'KeyH':
            this.data.selectedTool.next('handTool');
            break;
          case 'KeyG':
            if (e.ctrlKey) {
            } else {
              this.data.selectedTool.next('gradientTool');
            }
            break;
          case 'Delete':
            this.selectedLayers?.forEach((layer) => {
              // this.layerService.deleteLayer(layer.Id);
            });
            break;
          case 'Equal':
            if (e.ctrlKey) {
              console.log(e.code);
              e.preventDefault();
              let zoom = parseFloat(
                this.display!.nativeElement.style.scale || '1'
              );
              this.display!.nativeElement.style.scale = `${zoom + 0.02}`;
            }
            break;
          case 'Minus':
            if (e.ctrlKey) {
              e.preventDefault();
              let zoom = parseFloat(
                this.display!.nativeElement.style.scale || '1'
              );
              this.display!.nativeElement.style.scale = `${zoom - 0.02}`;
            }
            break;
          case 'KeyF':
            if (e.ctrlKey) {
              e.preventDefault();
            }
            break;
          case 'KeyJ':
            if (e.ctrlKey) {
              e.preventDefault();
              // this.layerService.duplicateLayer(this.selectedLayers![0]);
            }
            break;
          case 'KeyZ':
            if (e.ctrlKey) {
              e.preventDefault();
              // this.stateService.undo();
            } else {
              this.data.selectedTool.next('zoomTool');
            }
            break;
          case 'KeyY':
            if (e.ctrlKey) {
              e.preventDefault();
              // this.stateService.redo();
            }
            break;
        }
      }
    );
  }
  stopShortCuts() {
    this.shortcutsRenderFunc();
  }

  onRectSelectRightClick(e: any) {
    e.preventDefault();
  }
  disconfigureTools() {
    this.tools.forEach((tool) => {
      tool.disconfigure(this.display?.nativeElement);
    });
  }

  onNewDocumentCloseClick() {
    this.data.newMenuClick.next(false);
  }
  onNewDocumentCreateClick() {
    this.data.newMenuClick.next(false);
  }
  fadeSelection() {
    throw new Error('Method not implemented.');
  }
  makeWorkPath() {
    throw new Error('Method not implemented.');
  }
  inverseSelection() {
    throw new Error('Method not implemented.');
  }
  clearSelection() {
    this.data.currentSelection.next(null);
  }
  maskCurrentSelection() {
    throw new Error('Method not implemented.');
  }
  saveCurrentSelection() {
    throw new Error('Method not implemented.');
  }
  strokeSelection() {
    throw new Error('Method not implemented.');
  }
  fillSelection() {
    throw new Error('Method not implemented.');
  }
  createLayerFromASelectionViaCut() {
    throw new Error('Method not implemented.');
  }
  createLayerFromASelectionViaCopy() {
    const selectedLayer = this.selectedLayers[0];
  }
  ngOnDestroy() {
    this.data.layers.unsubscribe();
    this.data.selectedLayers.unsubscribe();
    this.data.newMenuClick.unsubscribe();
    this.shortcutsRenderFunc();
  }
}
