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
  tools: any[] = [
    brushTool,
    shapeTool,
    rectangularSelect,
    lassoTool,
    cloneStampTool,
    textTool,
    eraserTool,
    moveTool,
    penTool,
  ];
  @ViewChild('display') display?: ElementRef;
  @ViewChild('displayContainer') displayContainer?: ElementRef;

  @ViewChild('container') container?: ElementRef;
  @ViewChild('contextMenuRef') contextMenuElem?: ElementRef;
  selectionContextMenu!: { isActive: boolean; x: number; y: number };
  currentSelection?: Selection | null;
  loadingLayers: boolean = false;
  constructor(
    private data: DataService,
    private renderer: Renderer2,
    private clipboard: ClipboardService,
    private notification: NotificationService,
    private layerService: LayerService,
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}
  async ngOnInit() {
    const openedProjects = this.data.openedProjects.getValue();
    const params = this.activatedRoute.snapshot.params as any;
    //create a method for returing a single project from the server
    if (openedProjects.length < 1) {
      this.loadingService.startLoading('Loading project...');
      this.api
        .getProjects()
        .then((projects: any) => {
          const project = projects.find((p: any) => p.id == params.projectId);
          const serializedProject: Project = {
            Id: project.id,
            UserId: '',
            name: project.name,
            ...project,
          };
          this.data.openedProjects.next([serializedProject]);
          this.data.selectedProject.next(serializedProject);
          this.data.loadingLayers.next(true);
          this.loadingService.stopLoading();
          this.api
            .getLayers(project.id)
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
                          layer.projectId,
                          img
                        );
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
                  .catch((err) => {
                    console.log(err);
                  });
              });
            })
            .catch((err: any) => {
              this.data.loadingLayers.next(false);
              console.log(err);
            });
        })
        .catch((err) => {
          this.loadingService.stopLoading();
          this.notification.createNotification({
            title: "Couldn't load project.",
            quitAfter: 4000,
          });
          console.log(err);
        });
    }

    this.data.contextMenu.subscribe((cm) => {
      this.contextMenu = cm;
    });
    this.data.shortcutsEnabled.subscribe((se) => {
      this.shortcutsEnabled = se;
    });

    this.data.layers.subscribe((layers) => {
      this.layers = layers.filter(
        (layer) => layer.projectId == this.selectedProject?.Id
      );
      this.layers.forEach((layer) => {
        this.display?.nativeElement.appendChild(layer.getElem());
      });
    });
    this.data.openedProjects.subscribe((projects) => {
      this.projects = projects;
    });

    this.data.newMenuClick.subscribe((clicked) => {
      this.newDocumentActive = clicked;
    });
    this.data.selectedLayers.subscribe((sl) => {
      this.selectedLayers = sl;
      this.data.layers.getValue().forEach((layer) => {
        layer.resizer.disable();
      });
      const selectedTool = this.data.selectedTool.getValue();
      if (selectedTool != 'moveTool') {
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

    this.data.selectedTool.subscribe((tool) => {
      this.selectedTool = tool;
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

  private filterLayers(project: any) {
    this.data.layers.getValue().forEach((layer) => {
      console.log('projectId', project.id);
      console.log(layer.projectId == project.id);
      if (layer.projectId != project?.Id) {
        layer.hide();
      } else {
        console.log(layer);
        layer.show();
      }
    });
  }

  setZoom(e: any) {
    this.data.zoom.next(e);
  }
  ngAfterViewInit() {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      const selectionElem = this.data.currentSelection.getValue()?.view;
      if (selectionElem?.contains(e.target as HTMLElement)) {
        let containerRect = selectionElem.getBoundingClientRect();
        const selectedLayer = this.selectedLayers[0];
        this.setupSelectionContextMenu(e, containerRect, selectedLayer);
      }
    });

    this.data.selectedProject.subscribe((project) => {
      this.selectedProject = project;
      this.display!.nativeElement.style.width = project?.width + 'px';
      this.display!.nativeElement.style.height = project?.height + 'px';

      this.data.zoom.next(project?.Zoom || 36);
      this.filterLayers(project);
    });
    const selectedProject = this.data.selectedProject.getValue();
    const openedProjects = this.data.openedProjects.getValue();
    if (!selectedProject && openedProjects.length > 1) {
      this.data.selectedProject.next(openedProjects[0]);
    }
    this.data.displayElem.next(this.display?.nativeElement);
    this.configureContextMenu();
    this.handleLayerClick();

    this.addShortcuts();

    this.data.selectedTool.next('moveTool');

    this.handleSelectedToolConfig();
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
          click: () => {
            if (!(selectedLayer instanceof PixelLayer)) {
              return;
            }
            // // //layers/layer-via-copy
            // this.api
            //   .layerViaCopy(
            //     selectedLayer.projectId,
            //     selectedLayer.id,
            //     this.currentSelection?.points || []
            //   )
            //   .then((result) => {
            //     console.log(result);
            //   })
            //   .catch((err) => {
            //     console.log(err);
            //   });
            // // {
            // //   id: "",
            // //   projectId: "",
            // //   points: []
            // // }
            // // -> newLayer
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

  private handleSelectedToolConfig() {
    this.data.selectedTool.subscribe((selectedTool) => {
      this.tools.forEach((tool) => {
        if (tool.type == selectedTool) {
          this.disconfigureTools();
          switch (tool.type) {
            case 'moveTool':
              tool.configure(this.display?.nativeElement, this.data);
              break;
            case 'brushTool':
              tool.configure(
                this.display?.nativeElement,
                this.data,
                this.notification,
                this.renderer
              );
              break;
            case 'textTool':
              tool.configure(
                this.display?.nativeElement,
                this.data,
                this.renderer
              );
              break;
            case 'shapeTool':
              tool.configure(
                this.display?.nativeElement,
                this.renderer,
                this.data
              );
              break;
            case 'lassoTool':
              tool.configure(
                this.display?.nativeElement,
                this.data,
                this.renderer
              );
              break;
            case 'rectangularSelectTool':
              tool.configure(
                this.display?.nativeElement,
                this.data,
                this.renderer
              );
              break;
            case 'cloneStampTool':
              tool.configure(this.display?.nativeElement, this.layers[0]);
              break;
            case 'eraserTool':
              tool.configure(this.display?.nativeElement, this.data);
              break;
            case 'penTool':
              tool.configure(
                this.display?.nativeElement,
                this.data,
                this.renderer
              );
              break;
            default:
              tool.configure();
          }
          // tool.configure();
        }
      });
    });
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
      const selectedTool = this.data.selectedTool.getValue();
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
        case 'KeyM':
          this.data.selectedTool.next('moveTool');
          break;
        case 'KeyA':
          if (e.ctrlKey) {
            this.data.selectedLayers.next([...this.data.layers.getValue()]);
          }
          break;
        case 'KeyL':
          this.data.selectedTool.next('lassoTool');
          break;
        case 'KeyD':
          e.preventDefault();
          if (e.ctrlKey) {
            this.layerService.duplicateLayer(
              this.renderer,
              this.selectedLayers[0]
            );
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
        case 'KeyG':
          if (e.ctrlKey) {
          } else {
            this.data.selectedTool.next('gradientTool');
          }
          break;
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
            const cm = this.data.history.getValue().undoStack.pop();
            if (cm) {
              cm.execute();
              this.data.history.getValue().redoStack.push(cm);
            }
            e.preventDefault();
            // this.stateService.undo();
          } else {
            this.data.selectedTool.next('zoomTool');
          }
          break;
        case 'KeyY':
          if (e.ctrlKey) {
            const cm = this.data.history.getValue().redoStack.pop();
            if (cm) {
              cm.execute();
              this.data.history.getValue().undoStack.push(cm);
            }
            e.preventDefault();
            // this.stateService.redo();
          }
          break;
      }
    });
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
  createLayerFromASelectionViaCopy() {}
  insertArrayBuffer(
    app: PIXI.Application,
    buffer: Uint8Array | Uint8ClampedArray,
    width: number,
    height: number
  ) {
    const whiteTexture = PIXI.Sprite.from(
      PIXI.Texture.fromBuffer(buffer, width, height, {
        wrapMode: PIXI.WRAP_MODES.REPEAT,
      })
    );

    whiteTexture.width = app.screen.width;
    whiteTexture.height = app.screen.height;
    const texture = PIXI.RenderTexture.create({
      width: app.screen.width,
      height: app.screen.height,
    });
    const drawingSurface = new PIXI.Sprite(texture);

    whiteTexture.width = app.screen.width;
    whiteTexture.height = app.screen.height;
    drawingSurface.width = app.screen.width;
    drawingSurface.height = app.screen.height;
    app.stage.addChild(drawingSurface);
    app.renderer.render(whiteTexture, {
      renderTexture: texture,
      clear: true,
    });
  }
  ngOnDestroy() {
    // this.data.layers.unsubscribe();
    // this.data.selectedLayers.unsubscribe();
    this.data.newMenuClick.unsubscribe();
    this.shortcutsRenderFunc();
    this.data.zoom.unsubscribe();
    this.data.projects.unsubscribe();
    this.data.selectedProject.unsubscribe();
  }
}
