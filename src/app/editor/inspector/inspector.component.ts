import {
  Component,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
  HostListener,
  ViewChild,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { fabric } from 'fabric';
import { AdjustmentLayer } from 'src/app/types/layer';
import { LayerService } from 'src/app/core/services/layer.service';
import { Project } from 'src/app/types/project';
import { Mask } from 'src/app/core/layers/mask';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ApiService } from 'src/app/core/services/api.service';
import { BrightnessContrastAdjustmentLayer } from 'src/app/core/layers/adjustment/brightness_contrast';
import { PixelLayer } from 'src/app/core/layers/pixel-layer';
import { Layer } from 'src/app/core/layers/layer';
import { HueSaturationLightnees } from 'src/app/core/layers/adjustment/hue_saturation_lightnees';
import { Vibrance } from 'src/app/core/layers/adjustment/vibrance';
import { Exposure } from 'src/app/core/layers/adjustment/exposure';
import { settings } from 'src/app/settings/settings';
import { AdjustmentService } from 'src/app/core/services/adjustment.service';
import { slideAnimation } from './animations';
@Component({
  selector: 'app-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.scss'],
  animations: [slideAnimation],
})
export class InspectorComponent implements OnInit, OnDestroy {
  @ViewChild('ad_choices') ad_choices?: ElementRef;
  ad_choices_active: boolean = false;
  selectedLayers: Layer[] = [];
  movingLocked: boolean = false;
  layersPanel: boolean = true;
  propertiesPanel: boolean = false;
  blendingMods: string[] = [
    'Normal',
    'Dissolve',
    'Darken',
    'Multiply',
    'ColorBurn',
    'LinerBurn',
    'DarkerColor',
    'Lighten',
    'Screen',
    'ColorDodge',
    'LinearDodge',
    'LighterColor',
    'OverLay',
    'SoftLight',
    'HardLight',
    'VividLight',
    'LinearLight',
    'PinLight',
    'HardMix',
    'Difference',
    'Exclusion',
    'Subtract',
    'Divide',
    'Hue',
    'Saturation',
    'Color',
    'Luminosity',
  ];
  brushLocked: boolean = false;
  get AdjustmentLayer() {
    return AdjustmentLayer;
  }

  get settings() {
    return settings;
  }
  constructor(
    private data: DataService,
    private layerService: LayerService,
    private notification: NotificationService,
    private api: ApiService,
    private adjustmentService: AdjustmentService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.data.selectedLayers.subscribe((sl) => {
      this.selectedLayers = sl;
    });
  }
  createNewGroup() {
    // this.layerService.groupLayers(...this.selectedLayers);
  }
  toggleAdChoices() {
    this.ad_choices_active = this.ad_choices_active ? false : true;
  }
  toggleMovingLocked() {
    this.movingLocked = this.movingLocked ? false : true;
    this.data.isMovingAllowed.next(this.movingLocked);
  }
  toggleBrushLocked() {
    this.brushLocked = this.brushLocked ? false : true;
  }
  addAdjustmentLayer(ad_type: AdjustmentLayer) {
    const layer = this.selectedLayers[0];
    if (layer instanceof PixelLayer) {
      this.adjustmentService.addAdjustmentLayer(ad_type, layer);
    }
  }

  addLayerMask() {
    // this.selectedLayers.forEach((selectedLayer) => {
    //   const layer = this.layerService.findLayer(selectedLayer.Id);
    //   if (layer?.Type == LayerType.Pixel) {
    //     layer.mask = new Mask();
    //   }
    // });
  }

  deleteLayer() {
    // this.selectedLayers.forEach((sl) => {
    //   this.layerService.deleteLayer(sl.Id);
    // });
  }
  newLayer() {
    this.layerService.newLayer(this.renderer);
  }

  onOpacityChange(value: any) {
    for (let sl of this.selectedLayers) {
      // this.layerService.getObjByLayerId(sl.Id)!.opacity = value / 100;
      (sl as any).canvas.style.opacity = `${value}`;
    }
  }
  onDrag(e: any) {
    console.log(e.clientY);
  }
  onDrop(e: any) {
    console.log(e);
  }
  onBlendingModeChange(mode: string) {
    if (!this.selectedLayers[0]) return;
    // const img = this.layerService.getObjByLayerId(this.selectedLayers[0].Id);
    // if (img instanceof fabric.Image) {
    // img.filters?.push(new fabric.Image.filters.Grayscale());
    // img.applyFilters();
    // }
  }
  onRGBChannelVisibleChange(e: any) {
    const selectedLayer = this.selectedLayers[0];
    if (selectedLayer instanceof PixelLayer) {
      selectedLayer.channels.red = e;
      selectedLayer.channels.green = e;
      selectedLayer.channels.blue = e;
      selectedLayer.render();
    }
  }
  onRedChannelVisibleChange(e: any) {
    const selectedLayer = this.selectedLayers[0];
    if (selectedLayer instanceof PixelLayer) {
      selectedLayer.channels.red = e;
      selectedLayer.render();
    }
  }
  onGreenChannelVisibleChange(e: any) {
    const selectedLayer = this.selectedLayers[0];
    if (selectedLayer instanceof PixelLayer) {
      selectedLayer.channels.green = e;
      console.log(e);
      selectedLayer.render();
    }
  }
  onBlueChannelVisibleChange(e: any) {
    const selectedLayer = this.selectedLayers[0];
    if (selectedLayer instanceof PixelLayer) {
      selectedLayer.channels.blue = e;
      selectedLayer.render();
    }
  }
  ngOnDestroy() {
    this.data.selectedLayers.unsubscribe();
  }
}
