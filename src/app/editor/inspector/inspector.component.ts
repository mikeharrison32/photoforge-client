import {
  Component,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
  HostListener,
  ViewChild,
  ElementRef,
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
@Component({
  selector: 'app-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.scss'],
})
export class InspectorComponent implements OnInit, OnDestroy {
  canvas?: fabric.Canvas;
  @ViewChild('ad_choices') ad_choices?: ElementRef;
  ad_choices_active: boolean = false;
  selectedLayers: Layer[] = [];
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
  get AdjustmentLayer() {
    return AdjustmentLayer;
  }

  constructor(
    private data: DataService,
    private layerService: LayerService,
    private notification: NotificationService,
    private api: ApiService
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

  addAdjustmentLayer(ad_type: AdjustmentLayer) {
    switch (ad_type) {
      case AdjustmentLayer.BrightnessContrast:
        if (this.selectedLayers[0] instanceof PixelLayer) {
          let bc_count = 1;
          this.selectedLayers[0].adjustmentLayers.forEach((aj) => {
            if (aj instanceof BrightnessContrastAdjustmentLayer) {
              bc_count += 1;
            }
          });
          const aj = new BrightnessContrastAdjustmentLayer(
            this.selectedLayers[0],
            'BrightneesContrast ' + bc_count
          );
          this.selectedLayers[0].adjustmentLayers.push(aj);
        }
        break;
      case AdjustmentLayer.HueSaturation:
        if (this.selectedLayers[0] instanceof PixelLayer) {
          let hsl_count = 1;
          this.selectedLayers[0].adjustmentLayers.forEach((aj) => {
            if (aj instanceof HueSaturationLightnees) {
              hsl_count += 1;
            }
          });
          const aj = new HueSaturationLightnees(
            this.selectedLayers[0],
            'HueSaturationLightnees ' + hsl_count
          );
          this.selectedLayers[0].adjustmentLayers.push(aj);
        }
        break;
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
  createNewLayer() {
    this.notification.createNotification({
      title: 'Createing a blank layer...',
    });
    this.api
      .createBlankLayer(this.data.selectedProject.value?.Id!)
      .then((res) => {
        console.log(res);
        this.notification.createNotification({
          title: 'layer successfully created.',
        });
      })
      .catch((err) => {
        this.notification.createNotification({
          title: "Couldn't create blank layer.",
        });
        console.log(err);
      });
    // this.layerService.createNewLayer('Layer', LayerType.Pixel);
    this.notification.hideNotification();
  }

  onOpacityChange(value: any) {
    for (let sl of this.selectedLayers) {
      // this.layerService.getObjByLayerId(sl.Id)!.opacity = value / 100;
      (sl as any).canvas.style.opacity = `${value}`;
    }
    this.canvas?.renderAll();
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
    this.canvas?.renderAll();
  }
  ngOnDestroy() {
    this.data.selectedLayers.unsubscribe();
    this.data.canvas.unsubscribe();
  }
}
