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
  eraserTool,
  lassoTool,
  penTool,
  rectangularSelect,
  shapeTool,
  textTool,
} from '../core/tools/';
import { Project } from '../types/project';
import { StateService } from '../core/services/state.service';
import { ClipboardService } from '../core/services/clipboard.service';
import { ApiService } from '../core/services/api.service';
import { NotificationService } from '../core/services/notification.service';
import { Layer } from '../core/layers/layer';
import { PixelLayer } from '../core/layers/pixel-layer';
import { Selection } from '../core/selection';
import * as PIXI from 'pixi.js-legacy';
import { fabric } from 'fabric';
import { Command } from '../core';
import { LayerService } from '../core/services/layer.service';
import { moveTool } from '../core/tools/move-tool';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { LoadingService } from '../core/services/loading.service';
import { ToolService } from '../core/services/tool.service';
import { CropToolService } from '../core/services/crop-tool.service';
import { TokenService } from '../core/services/token.service';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom,
})
export class EditorComponent implements OnInit, AfterViewInit, OnDestroy {
  selectedLayers: Layer[] = [];
  selectedProject?: Project | null;
  layers: Layer[] = [];
  selectedTool: string = 'moveTool';
  projects: Project[] = [];
  zoom: number = 1;
  newDocumentActive?: boolean;
  contextMenu: any;
  @ViewChild('cursor') cursor?: ElementRef;
  @ViewChild('rectSelectContextMenu') rectSelectContextMenu?: ElementRef;
  shortcutsRenderFunc = (): void => {};
  shortcutsEnabled?: boolean = true;

  @ViewChild('display') display?: ElementRef;
  @ViewChild('displayContainer') displayContainer?: ElementRef;

  @ViewChild('container') container?: ElementRef;
  @ViewChild('contextMenuRef') contextMenuElem?: ElementRef;
  selectionContextMenu!: { isActive: boolean; x: number; y: number };
  currentSelection?: Selection | null;
  loadingLayers: boolean = false;
  loadingDocument: boolean = false;
  openedProject?: Project | null;
  cropToolActive: boolean = false;
  constructor(
    private data: DataService,
    private renderer: Renderer2,
    private clipboard: ClipboardService,
    private notification: NotificationService,
    private layerService: LayerService,
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private toolService: ToolService,
    private cropToolService: CropToolService,
    private tokenService: TokenService
  ) {
    toolService.renderer = renderer;
  }
  async ngOnInit() {
    this.data.contextMenu.subscribe((cm) => {
      this.contextMenu = cm;
    });
    this.data.shortcutsEnabled.subscribe((se) => {
      this.shortcutsEnabled = se;
    });

    this.cropToolService.configured.subscribe((isConfigured) => {
      this.cropToolActive = isConfigured;
    });

    this.data.layers.subscribe((layers) => {
      this.layers = layers;
      this.layers.forEach((layer) => {
        this.renderer.appendChild(this.display?.nativeElement, layer.getElem());
      });
    });

    this.data.newMenuClick.subscribe((clicked) => {
      this.newDocumentActive = clicked;
    });
    this.data.selectedLayers.subscribe((sl) => {
      this.selectedLayers = sl;
      this.data.layers.getValue().forEach((layer) => {
        layer.resizer.disable();
      });
      const selectedSizeTool =
        this.data.tools.getValue().sizePositionGroup.selectedTool;
      const selectedToolGroup = this.data.selectedToolGroup.getValue();
      if (selectedToolGroup != 'sizePostion' && selectedSizeTool != 'move') {
        return;
      }
      sl.forEach((sl_layer) => {
        if (sl_layer.visible) {
          sl_layer.resizer.enable();
        }
      });
    });

    this.updateZoom();

    this.data.currentSelection.subscribe((cs) => {
      this.currentSelection = cs;
      if (cs) {
        this.display?.nativeElement.appendChild(cs?.view);
      }
    });

    this.data.selectedToolGroup.subscribe((tool) => {
      this.selectedTool = tool;
    });
  }
  private loadProject(projectId: any) {
    this.loadingDocument = true;
    this.api
      .getProject(projectId)
      .then((project: any) => {
        console.log(project);
        const serializedProject: Project = {
          Id: project.id,
          UserId: '',
          name: project.name,
          ...project,
        };
        this.data.openedProject.next(serializedProject);
        this.loadingDocument = false;
      })
      .catch((err) => {
        this.loadingDocument = false;
        console.log(err);
        if (err.status == 401) {
          this.tokenService.refereshToken();
        }
      });
  }

  private loadLayers(projectId: any) {
    this.api
      .getLayers(projectId)
      .then((layers: any) => {
        this.data.loadingLayers.next(false);
        layers.forEach((layer: any) => {
          const imageResult = firstValueFrom(
            this.http.get(layer.url, { responseType: 'blob' })
          );
          imageResult
            .then((res: Blob) => {
              const reader = new FileReader();
              reader.onload = (e) => {
                const img = new Image();

                img.onload = () => {
                  const player = new PixelLayer(
                    this.data,
                    this.renderer,
                    layer.id,
                    layer.name,
                    layer.projectId
                  );
                  player.insertImage(img);
                  this.data.layers.next([
                    ...this.data.layers.getValue(),
                    player,
                  ]);
                };
                img.crossOrigin = '';
                img.src = e.target!.result as string;
              };
              reader.readAsDataURL(res);
            })
            .then(() => {
              this.data.layers.getValue().forEach((layer) => {
                this.display?.nativeElement.appendChild(layer.elem);
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err: any) => {
        this.data.loadingLayers.next(false);
        console.log(err);
      });
  }

  private updateZoom() {
    this.data.zoom.subscribe((zoom) => {
      this.zoom = zoom;
      this.display!.nativeElement.style.scale = (zoom / 100).toString();
      const displayScale = parseFloat(
        this.display?.nativeElement.style.scale || '1'
      );
      this.display!.nativeElement.parentElement.style.width =
        this.display?.nativeElement.clientWidth * displayScale + 'px';
      this.display!.nativeElement.parentElement.style.height =
        this.display?.nativeElement.clientHeight * displayScale + 'px';
      if (this.selectedProject) {
        this.selectedProject.Zoom = zoom;
      }
      this.data.selectedLayers.getValue().forEach((lr) => {
        lr.resizer.update();
      });
    });
  }

  setZoom(e: any) {
    this.data.zoom.next(e);
  }
  ngAfterViewInit() {
    //if clicked on a selection display the selection context menu

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      const selectionElem = this.data.currentSelection.getValue()?.view;
      if (selectionElem?.contains(e.target as HTMLElement)) {
        let containerRect = selectionElem.getBoundingClientRect();
        const selectedLayer = this.selectedLayers[0];
        this.setupSelectionContextMenu(e, containerRect, selectedLayer);
      }
    });

    this.data.openedProject.subscribe((project) => {
      this.openedProject = project;
      this.display!.nativeElement.style.width = project?.width + 'px';
      this.display!.nativeElement.style.height = project?.height + 'px';
      this.data.zoom.next(project?.Zoom || 36);
    });

    this.data.displayElem.next(this.display?.nativeElement);
    this.data.displayContainer.next(this.displayContainer?.nativeElement);

    this.configureContextMenu();
    this.handleLayerClick();

    this.addShortcuts();

    //load project
    const params = this.activatedRoute.snapshot.params as any;
    this.loadProject(params.projectId);
    this.loadLayers(params.projectId);
  }

  private setupSelectionContextMenu(
    e: MouseEvent,
    containerRect: DOMRect,
    selectedLayer: Layer
  ) {
    const selectionContextMenu = {
      x: e.clientX - containerRect!.left,
      y: e.clientY - containerRect!.top,
      menus: [
        {
          name: 'Layer via Copy',
          click: async () => {
            if (!(selectedLayer instanceof PixelLayer)) {
              return;
            }
            const newLayer = new PixelLayer(
              this.data,
              this.renderer,
              `${Math.random()}`,
              'Layer',
              this.data.openedProject.getValue()!.Id
            );
            const newLayerCtx = await newLayer.get2DContext();
            const selectedLayerCtx = await selectedLayer.get2DContext();

            const imgData = selectedLayerCtx?.getImageData(0, 0, 150, 150);

            newLayerCtx?.putImageData(imgData!, 50, 50);

            this.data.layers.next([...this.data.layers.getValue(), newLayer]);
          },
        },
        {
          name: 'Layer via Cut',
          click: () => {
            //include layerviacopy
            //remove the parts
          },
        },
        {
          name: 'Deselect',
          click: () => {
            // client operation
          },
        },
        {
          name: 'Select Inverse',
          click: () => {
            // client operation
          },
        },
        {
          name: 'Select and Mask',
          click: () => {
            // unsure
          },
        },
        {
          name: 'New Layer...',
          click: () => {
            //don't know what thi does
          },
        },
        {
          name: 'Fill',
          click: () => {},
        },
        {
          name: 'Stroke...',
          click: () => {
            //  unsure
          },
        },
        {
          name: 'Fade...',
          click: () => {
            // unsure
          },
        },
      ],
    };
    this.data.contextMenu.next(selectionContextMenu);
  }

  private configureContextMenu() {
    const contextMenuElem = this.contextMenuElem?.nativeElement as HTMLElement;
    const clickedOutSideContextMenu = (e: any) => {
      if (
        !contextMenuElem.contains(e.target) &&
        Object.entries(this.data.contextMenu.getValue()).length > 0
      ) {
        this.data.contextMenu.next({});
      }
    };
    this.renderer.listen(document, 'mousedown', clickedOutSideContextMenu);
  }

  private handleLayerClick() {
    this.renderer.listen(this.container?.nativeElement, 'mousedown', (e) => {
      const selectedTool = this.data.selectedToolGroup.getValue();
      if (selectedTool != 'moveTool') {
        return;
      }

      const activeLayer = this.data.layers
        .getValue()
        .find((layer) => layer.resizer.enabled);
      this.data.layers.getValue().forEach((layer) => {
        if (layer.contains(e.target)) {
          layer.resizer.enable();
        } else if (activeLayer && activeLayer.resizer) {
          activeLayer.resizer.disable();
        }
      });
    });
  }

  addShortcuts() {
    this.renderer.listen('document', 'keydown', (e) => {
      if (!this.shortcutsEnabled) {
        return;
      }
      switch (e.code) {
        //   case 'KeyM':
        //     this.data.selectedTool.next('moveTool');
        //     break;
        //   case 'KeyA':
        //     if (e.ctrlKey) {
        //       this.data.selectedLayers.next([...this.data.layers.getValue()]);
        //     }
        //     break;
        //   case 'KeyL':
        //     this.data.selectedTool.next('lassoTool');
        //     break;
        //   case 'KeyD':
        //     e.preventDefault();
        //     if (e.ctrlKey) {
        //       this.layerService.duplicateLayer(
        //         this.renderer,
        //         this.selectedLayers[0]
        //       );
        //     }
        //     break;
        //   case 'KeyR':
        //     if (e.ctrlKey) {
        //       return;
        //     }
        //     e.preventDefault();
        //     this.data.selectedTool.next('rectangularSelectTool');
        //     break;
        //   case 'KeyS':
        //     this.data.selectedTool.next('shapeTool');
        //     break;
        //   case 'KeyB':
        //     this.data.selectedTool.next('brushTool');
        //     break;
        //   case 'KeyC':
        //     if (e.ctrlKey) {
        //       // this.clipboard.copyLayer(this.selectedLayers![0]);
        //     } else {
        //       this.data.selectedTool.next('cropTool');
        //     }
        //     break;
        //   case 'KeyX':
        //     if (e.ctrlKey) {
        //       // this.clipboard.cutLayer(this.selectedLayers![0]);
        //     }
        //     break;
        //   case 'KeyT':
        //     this.data.selectedTool.next('textTool');
        //     break;
        //   case 'KeyP':
        //     this.data.selectedTool.next('penTool');
        //     break;
        //   case 'KeyV':
        //     if (e.ctrlKey) {
        //       this.clipboard.pasteLayer();
        //     }
        //     break;
        //   case 'KeyE':
        //     this.data.selectedTool.next('eraserTool');
        //     break;
        //   case 'KeyH':
        //     this.data.selectedTool.next('handTool');
        //     break;
        case 'KeyF':
          e.preventDefault();
          if (e.ctrlKey) {
            this.data.selectedLayers.getValue().forEach((layer) => {
              layer.elem.style.zIndex = `${
                parseInt(layer.elem.style.zIndex || '1') + 1
              }`;
            });
          }
          break;
        //   case 'KeyG':
        //     if (e.ctrlKey) {
        //     } else {
        //       this.data.selectedTool.next('gradientTool');
        //     }
        //     break;
        case 'Delete':
          const selection = this.data.currentSelection.getValue();
          if (selection) {
          } else {
            const newLayersArray: Layer[] = [];
            this.data.layers.getValue().forEach((layer) => {
              if (this.selectedLayers.includes(layer)) {
                layer.remove();
              } else {
                newLayersArray.push(layer);
              }
            });
            this.data.layers.next(newLayersArray);
          }
          break;
        case 'Equal':
          if (e.ctrlKey) {
            e.preventDefault();
            this.data.zoom.next(this.data.zoom.getValue() + 2);
          }
          break;
        case 'Minus':
          if (e.ctrlKey) {
            e.preventDefault();
            this.data.zoom.next(this.data.zoom.getValue() - 2);
          }
          break;
        //   case 'KeyF':
        //     if (e.ctrlKey) {
        //       e.preventDefault();
        //     }
        //     break;
        //   case 'KeyJ':
        //     if (e.ctrlKey) {
        //       e.preventDefault();
        //       // this.layerService.duplicateLayer(this.selectedLayers![0]);
        //     }
        //     break;
        //   case 'KeyZ':
        //     if (e.ctrlKey) {
        //       const cm = this.data.history.getValue().undoStack.pop();
        //       if (cm) {
        //         cm.execute();
        //         this.data.history.getValue().redoStack.push(cm);
        //       }
        //       e.preventDefault();
        //       // this.stateService.undo();
        //     } else {
        //       this.data.selectedTool.next('zoomTool');
        //     }
        //     break;
        // case 'KeyY':
        //   if (e.ctrlKey) {
        //     const cm = this.data.history.getValue().redoStack.pop();
        //     if (cm) {
        //       cm.execute();
        //       /.data.history.getValue().undoStack.push(cm);
        //     }
        //     e.preventDefault();
        //     this.stateService.redo();
        //   }
        //   break;
      }
    });
  }
  stopShortCuts() {
    this.shortcutsRenderFunc();
  }

  onRectSelectRightClick(e: any) {
    e.preventDefault();
  }
  disconfigureTools() {}

  onNewDocumentCloseClick() {
    this.data.newMenuClick.next(false);
  }
  onNewDocumejntCreateClick() {
    this.data.newMenuClick.next(false);
  }

  ngOnDestroy() {
    this.data.newMenuClick.unsubscribe();
    this.shortcutsRenderFunc();
    this.data.zoom.unsubscribe();
    this.data.projects.unsubscribe();
    this.data.selectedProject.unsubscribe();
  }
}
