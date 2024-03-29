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
  eraserTool,
  lassoTool,
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
    cropTool,
    rectangularSelect,
    lassoTool,
    cloneStampTool,
    textTool,
    eraserTool,
    moveTool,
  ];
  @ViewChild('display') display?: ElementRef;
  @ViewChild('container') container?: ElementRef;
  @ViewChild('contextMenuRef') contextMenuElem?: ElementRef;
  selectionContextMenu!: { isActive: boolean; x: number; y: number };
  currentSelection?: Selection | null;
  constructor(
    private data: DataService,
    private renderer: Renderer2,
    private clipboard: ClipboardService,
    private notification: NotificationService,
    private layerService: LayerService
  ) {}
  ngOnInit() {
    this.data.showNav.next(false);

    this.data.contextMenu.subscribe((cm) => {
      this.contextMenu = cm;
    });
    this.data.shortcutsEnabled.subscribe((se) => {
      this.shortcutsEnabled = se;
    });
    this.data.projects.subscribe((projects) => {
      this.projects = projects;
    });
    this.data.layers.subscribe((layers) => {
      // this.filterLayers(this.selectedProject!)
      this.layers = layers.filter(
        (layer) => layer.projectId == this.selectedProject?.Id
      );
      this.layers.forEach((layer) => {
        this.display?.nativeElement.appendChild(layer.getElem());
      });
    });

    this.data.selectedProject.subscribe((project) => {
      this.selectedProject = project;
      this.data.zoom.next(project?.Zoom || 50);
      this.filterLayers(project);
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

      if (this.data.selectedTool.getValue() == 'cropTool') {
        cropTool.update();
      }
    });

    this.data.currentSelection.subscribe((cs) => {
      this.currentSelection = cs;
      if (cs) {
        this.display?.nativeElement.appendChild(cs?.view);
      }
    });
  }
  private filterLayers(project: Project | null) {
    this.data.layers.getValue().forEach((layer) => {
      if (layer.projectId != project?.Id) {
        layer.hide();
      } else {
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
        const selectionContextMenu = {
          x: e.clientX - containerRect!.left,
          y: e.clientY - containerRect!.top,
          menus: [
            {
              name: 'Layer via Copy',
              click: () => {
                if (selectedLayer instanceof PixelLayer) {
                  const img = new Image();
                  img.src = selectedLayer.src || '';
                  const copyLayer = new PixelLayer(
                    this.data,
                    this.renderer,
                    // display,
                    `${Math.random()}`,
                    'Layer 1 Copy',
                    selectedLayer.projectId,
                    img
                  );
                  this.data.layers.next([
                    ...this.data.layers.getValue(),
                    copyLayer,
                  ]);
                }
              },
            },
            {
              name: 'Layer via Cut',
              click: () => {
                console.log('layer via cut');
              },
            },
            {
              name: 'Deselect',
              click: () => {
                console.log('fill fill');
              },
            },
            {
              name: 'Select Inverse',
              click: () => {
                console.log('fill fill');
              },
            },
            {
              name: 'Select and Mask',
              click: () => {
                console.log('fill fill');
              },
            },
            {
              name: 'New Layer...',
              click: () => {
                console.log('fill fill');
              },
            },
            {
              name: 'Fill',
              click: () => {
                if (
                  !(selectedLayer instanceof PixelLayer) ||
                  !this.currentSelection
                ) {
                  return;
                }
                const points = this.currentSelection.points;
                const poly = new PIXI.Polygon(points);
                const pixels = selectedLayer.pixels!;

                // selectedLayer.forEachPixels((x, y) => {});
                selectedLayer.forEachPixels((x, y) => {
                  if (poly.contains(x, y)) {
                    const index = (y * selectedLayer.width + x) * 4;
                    pixels[index] = 0;
                    pixels[index + 1] = 0;
                    pixels[index + 2] = 0;
                    pixels[index + 3] = 0;
                  }
                });

                selectedLayer.insertPixels(
                  pixels,
                  0,
                  0,
                  selectedLayer.width,
                  selectedLayer.height
                );
              },
            },
            {
              name: 'Stroke...',
              click: () => {
                console.log('fill fill');
              },
            },
            {
              name: 'Fade...',
              click: () => {
                console.log('fill fill');
              },
            },
          ],
        };
        this.data.contextMenu.next(selectionContextMenu);
      }
    });
    this.data.displayElem.next(this.display?.nativeElement);
    this.configureContextMenu();
    this.handleLayerClick();

    this.addShortcuts();

    this.data.selectedTool.next('moveTool');

    this.handleSelectedToolConfig();
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
            case 'cropTool':
              tool.configure(this.display?.nativeElement, this.data);
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
    (this.container?.nativeElement as HTMLElement).addEventListener(
      'mousedown',
      (e) => {
        const selectedTool = this.data.selectedTool.getValue();
        if (selectedTool != 'moveTool') {
          return;
        }
        // console.log('md');
        const selectedLayer = this.data.selectedLayers.getValue()[0];
        this.data.layers.getValue().forEach((layer) => {
          if (layer.contains(e.target as HTMLElement)) {
            layer.resizer.enable();
            // this.data.selectedLayers.next([layer]);
          } else if (selectedLayer && selectedLayer.resizer) {
            selectedLayer.resizer.disable();
          }
        });
      }
    );
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
