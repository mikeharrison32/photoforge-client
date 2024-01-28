import { Injectable, OnDestroy, OnInit } from '@angular/core';
import {
  AdjustmentLayer,
  AdjustmentLayerType,
  Layer,
  LayerType,
} from '../../types/layer';
import { DataService } from './data.service';
import { fabric } from 'fabric';
import { Filter } from 'src/app/enums/filter';
import { StateService } from './state.service';
@Injectable({
  providedIn: 'root',
})
export class LayerService {
  constructor(private data: DataService, private stateService: StateService) {}

  // getObjByLayerId(layerId: string): fabric.Object | undefined {
  //   return this.data.canvas
  //     ?.value!.getObjects()
  //     .find((obj) => obj.name == layerId);
  // }
  // findLayer(id: string): Layer | undefined {
  //   const layer = this.data.layers.value.find((l) => l.Id == id);
  //   return layer;
  // }
  // findAdjustmentLayer(
  //   id: string,
  //   layerId: string
  // ): AdjustmentLayerType | undefined {
  //   const ad_layer = this.data.adustmentLayers.value.find(
  //     (ad) => ad.LayerId == layerId && ad.Id == id
  //   );
  //   return ad_layer;
  // }
  // clearAllLayerSelection() {
  //   this.data.selectedAdjustmentLayers.next([]);
  //   this.data.selectedLayers.next([]);
  // }
  // setSelectedLayer(id: string) {
  //   this.clearAllLayerSelection();
  //   const layer = this.findLayer(id);
  //   this.data.selectedLayers.next([layer!]);
  // }
  // setSelectedAdjustmentLayer(id: string, layerId: string) {
  //   this.clearAllLayerSelection();
  //   const ad_layer = this.findAdjustmentLayer(id, layerId);
  //   this.data.selectedAdjustmentLayers.next([ad_layer!]);
  // }
  // createNewLayer(
  //   title: string,
  //   type: LayerType,
  //   projectId?: string,
  //   obj?: fabric.Object,
  //   url?: string
  // ): Layer {
  //   let lastIndex = this.data.layers.getValue().length;
  //   let newLayer: Layer;
  //   switch (type) {
  //     case LayerType.Pixel:
  //       newLayer = {
  //         Type: LayerType.Pixel,
  //         Id: `lda${Math.random()}cd`,
  //         ProjectId: projectId || this.data.selectedProject.value?.Id || 'fsdf',
  //         Title: `${title} ${lastIndex}`,
  //         X: 0,
  //         Y: 0,
  //         Url: url || 'assets/transparent-image.jpg',
  //         stackIndex: lastIndex,
  //       };
  //       break;
  //     case LayerType.Type:
  //       if (obj instanceof fabric.IText) {
  //         newLayer = {
  //           Type: LayerType.Type,
  //           Id: `lda${Math.random()}cd`,
  //           ProjectId: projectId || 'dwd',
  //           Text: `${title} ${lastIndex}`,
  //           obj: obj,
  //           X: 0,
  //           Y: 0,
  //           stackIndex: lastIndex,
  //         };
  //       }
  //       break;
  //     case LayerType.Shape:
  //       newLayer = {
  //         Type: LayerType.Shape,
  //         Id: `lda${Math.random()}cd`,
  //         ProjectId: projectId || 'dwd',
  //         Title: title,
  //         X: 0,
  //         Y: 0,
  //         obj: obj,
  //         stackIndex: lastIndex,
  //       };
  //       break;
  //   }
  //   this.data.layers.next([...this.data.layers.getValue(), newLayer!]);
  //   this.stateService.updateState();
  //   return newLayer!;
  // }
  // groupLayers(...layers: Layer[]) {
  //   const groupId = `${Math.random()}dw`;
  //   const group = new fabric.Group();
  //   group.name = groupId;
  //   this.data.groups.value.push({
  //     Id: groupId,
  //     Title: `Group ${this.data.groups.value.length + 1}`,
  //   });
  //   layers.forEach((layer) => {
  //     const obj = this.getObjByLayerId(layer.Id);
  //     layer.GroupId = groupId;
  //     group.addWithUpdate(obj);
  //   });
  //   this.data.canvas.value?.add(group);
  // }
  // groupObjects(...obj: fabric.Object[]) {
  //   const group = new fabric.Group(obj);
  //   this.data.canvas.value?.add(group);
  // }
  // updateLayer(id: string, lr: Layer) {
  //   const layer = this.findLayer(id);
  //   if (layer) {
  //     Object.assign(layer, lr);
  //   }
  //   this.stateService.updateState();
  // }
  // hideLayer(layer: Layer) {
  //   this.updateLayer(layer.Id, { ...layer, Hidden: true });
  //   this.getObjByLayerId(layer.Id)!.visible = false;
  //   this.getObjByLayerId(layer.Id)!.hasBorders = false;
  //   this.data.canvas.value?.renderAll();
  // }
  // unHideLayer(layer: Layer) {
  //   this.updateLayer(layer.Id, { ...layer, Hidden: false });
  //   this.getObjByLayerId(layer.Id)!.visible = true;
  //   this.getObjByLayerId(layer.Id)!.hasBorders = true;
  //   this.data.canvas.value?.renderAll();
  // }
  // lockLayer(layer: Layer) {
  //   this.updateLayer(layer.Id, { ...layer, Locked: true });
  //   const obj = this.getObjByLayerId(layer.Id);
  //   obj!.evented = false;
  //   obj!.selectable = false;
  //   obj!.hasControls = false;
  //   obj!.hasBorders = false;
  //   this.data.canvas.value?.renderAll();
  // }
  // unLockLayer(layer: Layer) {
  //   this.updateLayer(layer.Id, { ...layer, Locked: false });
  //   const obj = this.getObjByLayerId(layer.Id);
  //   obj!.evented = true;
  //   obj!.hasControls = true;
  //   obj!.selectable = true;
  //   obj!.hasBorders = true;
  //   this.data.canvas.value?.renderAll();
  // }
  // addLayerToSelection(id: string) {
  //   const layer = this.findLayer(id);

  //   let updatedSelectedLayers: Layer[] = [];
  //   if (this.data.selectedLayers.value.includes(layer!)) {
  //     updatedSelectedLayers = [...this.data.selectedLayers.getValue()];
  //     updatedSelectedLayers.splice(
  //       this.data.selectedLayers.value.indexOf(layer!),
  //       1
  //     );
  //   } else {
  //     updatedSelectedLayers = [...this.data.selectedLayers.getValue()];
  //     updatedSelectedLayers.push(layer!);
  //   }
  //   this.data.selectedLayers.next(updatedSelectedLayers);
  // }
  // addAdjustmentLayerToSelection(id: string, layerId: string) {
  //   const ad_layer = this.findAdjustmentLayer(id, layerId);
  //   this.data.selectedAdjustmentLayers.next([
  //     ...this.data.selectedAdjustmentLayers.getValue(),
  //     ad_layer!,
  //   ]);
  // }
  // addAdjustmentLayer(ad_type: AdjustmentLayer, layerId: string) {
  //   let lastIndex = this.data.adustmentLayers.value.length + 1;
  //   let ad_layer: AdjustmentLayerType;
  //   switch (ad_type) {
  //     case AdjustmentLayer.Exposure:
  //       ad_layer = {
  //         Type: AdjustmentLayer.Exposure,
  //         Id: `${Math.random()}dadsa`,
  //         ProjectId: 'das',
  //         LayerId: layerId,
  //         Title: `Exposure ${lastIndex} `,
  //       };
  //       break;
  //     case AdjustmentLayer.SolidColor:
  //       ad_layer = {
  //         Type: AdjustmentLayer.SolidColor,
  //         Id: `${Math.random()}`,
  //         Title: 'Color Fill 1',
  //         LayerId: layerId,
  //         ProjectId: 'fsf',
  //         color: {
  //           R: 0,
  //           G: 0,
  //           B: 0,
  //           A: 1,
  //         },
  //         hasMask: true,
  //       };
  //       break;
  //     case AdjustmentLayer.BrightnessContrast:
  //       ad_layer = {
  //         Type: AdjustmentLayer.BrightnessContrast,
  //         Id: `${Math.random()}`,
  //         Title: 'Brightness/Contrast 1',
  //         LayerId: layerId,
  //         ProjectId: 'fsf',
  //         Brightness: 0,
  //         Contrast: 0,
  //         UseLegacy: false,
  //         hasMask: true,
  //       };
  //       break;
  //     case AdjustmentLayer.Vibrance:
  //       ad_layer = {
  //         Type: AdjustmentLayer.Vibrance,
  //         Id: `${Math.random()}`,
  //         Title: 'Vibrance 1',
  //         LayerId: layerId,
  //         ProjectId: 'fsf',
  //         vibrance: 0,
  //         saturation: 0,
  //         hasMask: true,
  //       };
  //       break;
  //     case AdjustmentLayer.HueSaturation:
  //       ad_layer = {
  //         Type: AdjustmentLayer.HueSaturation,
  //         Id: `${Math.random()}`,
  //         Title: 'Hue saturation 1',
  //         LayerId: layerId,
  //         ProjectId: 'fsf',
  //         hue: 0,
  //         saturation: 0,
  //         lightness: 0,
  //         hasMask: true,
  //       };
  //       break;
  //     case AdjustmentLayer.ColorBalance:
  //       ad_layer = {
  //         Type: AdjustmentLayer.ColorBalance,
  //         Id: `${Math.random()}`,
  //         Title: 'Color Balance 1',
  //         LayerId: layerId,
  //         ProjectId: 'fsf',
  //         CyanRed: 2,
  //         MagentaGreen: 3,
  //         YellowBlue: 3,
  //         hasMask: true,
  //       };
  //       break;
  //     case AdjustmentLayer.BlackWhite:
  //       ad_layer = {
  //         Type: AdjustmentLayer.BlackWhite,
  //         Id: `${Math.random()}`,
  //         Title: 'Black & White 1',
  //         LayerId: layerId,
  //         ProjectId: 'fsf',
  //         Reds: 2,
  //         Yellows: 2,
  //         Greens: 2,
  //         Cyans: 2,
  //         Blues: 2,
  //         Magentas: 2,
  //         hasMask: true,
  //       };
  //       break;
  //     case AdjustmentLayer.Levels:
  //       ad_layer = {
  //         Type: AdjustmentLayer.Levels,
  //         Id: `${Math.random()}`,
  //         Title: 'Levels 1',
  //         LayerId: layerId,
  //         ProjectId: 'fsf',
  //         hasMask: false,
  //       };
  //       break;
  //   }

  //   const currentAdjustmentLayerValue = this.data.adustmentLayers.getValue();
  //   this.data.selectedAdjustmentLayers.next([ad_layer!]);
  //   this.data.selectedLayers.next([]);
  //   const updatedAdjustmentLayerValue = [
  //     ...currentAdjustmentLayerValue,
  //     ad_layer!,
  //   ];
  //   this.data.adustmentLayers.next(updatedAdjustmentLayerValue);
  //   this.stateService.updateState();
  //   this.data.canvas?.value?.renderAll();
  // }
  // clearAdjustment(ad_layer: AdjustmentLayerType) {
  //   const img = this.getObjByLayerId(ad_layer.LayerId);
  //   if (!(img instanceof fabric.Image)) {
  //     return;
  //   }
  //   switch (ad_layer.Type) {
  //     case AdjustmentLayer.Exposure:
  //       this.deleteFilter(img, ad_layer.Type.toString().toLowerCase());
  //       break;
  //     case AdjustmentLayer.SolidColor:
  //       break;
  //     case AdjustmentLayer.BrightnessContrast:
  //       break;
  //     case AdjustmentLayer.Vibrance:
  //       break;
  //     case AdjustmentLayer.HueSaturation:
  //       break;
  //     case AdjustmentLayer.ColorBalance:
  //       break;
  //     case AdjustmentLayer.BlackWhite:
  //       break;
  //     case AdjustmentLayer.Levels:
  //       break;
  //   }

  //   const currentAdjustmentLayerValue = this.data.adustmentLayers.getValue();
  //   this.data.selectedAdjustmentLayers.next([ad_layer!]);
  //   this.data.selectedLayers.next([]);
  //   const updatedAdjustmentLayerValue = [
  //     ...currentAdjustmentLayerValue,
  //     ad_layer!,
  //   ];
  //   this.data.adustmentLayers.next(updatedAdjustmentLayerValue);
  //   this.data.canvas?.value?.renderAll();
  // }
  // addAdjustmentLayerToImage(ad_layer: AdjustmentLayerType) {
  //   const img = this.getObjByLayerId(ad_layer.LayerId);
  //   if (!(img instanceof fabric.Image)) {
  //     return;
  //   }
  //   switch (ad_layer.Type) {
  //     case AdjustmentLayer.Exposure:
  //       break;
  //     case AdjustmentLayer.SolidColor:
  //       const color = ad_layer.color;
  //       img.fill = `rgba(${color.R}, ${color.G}, ${color.B}, ${color.A})`;

  //       break;
  //     case AdjustmentLayer.BrightnessContrast:
  //       let brightness = new fabric.Image.filters.Brightness({
  //         brightness: ad_layer.Brightness,
  //       });
  //       let contrast = new fabric.Image.filters.Contrast({
  //         contrast: ad_layer.Contrast,
  //       });
  //       brightness.setOptions({ name: 'brightness' });
  //       contrast.setOptions({ name: 'contrast' });
  //       this.deleteFilter(img, 'brightness', 'contrast');
  //       img.filters?.push(brightness, contrast);
  //       img.applyFilters();
  //       break;
  //     case AdjustmentLayer.Vibrance:
  //       break;
  //     case AdjustmentLayer.HueSaturation:
  //       let hue = new fabric.Image.filters.HueRotation({
  //         rotation: ad_layer.hue,
  //       });
  //       let saturation = new fabric.Image.filters.Saturation({
  //         saturation: ad_layer.saturation,
  //       });
  //       let lightness = new fabric.Image.filters.Brightness({
  //         brightness: ad_layer.lightness,
  //       });
  //       hue.setOptions({ name: 'hue' });
  //       saturation.setOptions({ name: 'saturation' });
  //       lightness.setOptions({ name: 'lightness' });
  //       this.deleteFilter(img, 'hue', 'saturation', 'lightness');
  //       img.filters!.push(hue, saturation, lightness);
  //       img.applyFilters();
  //       break;
  //     case AdjustmentLayer.ColorBalance:
  //       break;
  //     case AdjustmentLayer.BlackWhite:
  //       break;
  //   }
  // }
  // private deleteFilter(img: fabric.Image, ...names: string[]) {
  //   for (let name of names) {
  //     const filter = img.filters?.find(
  //       (filter) => (filter as any).name == name
  //     );
  //     if (filter) {
  //       let filterIndex = img.filters?.indexOf(filter);
  //       img.filters?.splice(filterIndex!);
  //     }
  //   }
  // }
  // duplicateLayer(lr: Layer) {
  //   const layer = this.findLayer(lr.Id);
  //   if (layer?.Type == LayerType.Pixel) {
  //     const duplicate_layer: Layer = {
  //       ...layer!,
  //       Id: `happy${Math.random()}rw`,
  //       Title: `${layer?.Title} Copy 1`,
  //     };
  //     this.data.layers.next([...this.data.layers.getValue(), duplicate_layer]);
  //   } else if (layer?.Type == LayerType.Type) {
  //     const duplicate_layer: Layer = {
  //       ...layer!,
  //       Id: `happy${Math.random()}rw`,
  //       Text: `${layer?.Text} Copy 1`,
  //     };
  //     duplicate_layer.obj.name = duplicate_layer.Id;
  //     this.data.layers.next([...this.data.layers.getValue(), duplicate_layer]);
  //   } else if (layer?.Type == LayerType.Shape) {
  //     const duplicate_layer: Layer = {
  //       ...layer!,
  //       Id: `happy${Math.random()}rw`,
  //       Title: `${layer?.Title} Copy 1`,
  //     };
  //     duplicate_layer.obj!.name = duplicate_layer.Id;
  //     this.data.layers.next([...this.data.layers.getValue(), duplicate_layer]);
  //   }
  //   this.stateService.updateState();
  // }
  // removeAdjustmentLayer(ad_layer: AdjustmentLayerType) {}
  // deleteLayer(id: string) {
  //   const layer = this.findLayer(id);
  //   const obj = this.getObjByLayerId(id);
  //   const layers = this.data.layers.value;
  //   const currentLayersValue = this.data.layers.getValue();
  //   const updatedLayersValue: Layer[] = [];
  //   currentLayersValue.forEach((layer) => {
  //     if (layer.Id != id) {
  //       updatedLayersValue.push(layer);
  //     }
  //   });
  //   this.data.layers.next(updatedLayersValue);
  //   if (obj) {
  //     this.data.canvas.value?.remove(obj);
  //   }
  //   this.stateService.updateState();
  // }
  // addFilter(filter: Filter) {
  //   const img = this.getObjByLayerId(this.data.selectedLayers.value[0].Id);
  //   if (!(img instanceof fabric.Image)) {
  //     return;
  //   }
  //   switch (filter) {
  //     case Filter.Blur:
  //       img.filters?.push(new fabric.Image.filters.Blur({ blur: 1 }));
  //       img.applyFilters();

  //       this.data.canvas.value?.renderAll();
  //       break;
  //     case Filter.Noise:
  //       if (img instanceof fabric.Image) {
  //         img.filters?.push(new fabric.Image.filters.Noise({ noise: 100 }));
  //         img.applyFilters();
  //       }
  //       this.data.canvas.value?.renderAll();
  //       break;
  //     case Filter.Pixelate:
  //       if (img instanceof fabric.Image) {
  //         img.filters?.push(
  //           new fabric.Image.filters.Pixelate({ blocksize: 10 })
  //         );
  //         img.applyFilters();
  //       }
  //       this.data.canvas.value?.renderAll();
  //       break;
  //   }
  // }
  // hideAdjustment(ad_layer: AdjustmentLayerType) {
  //   const img = this.getObjByLayerId(ad_layer.LayerId);
  //   if (!(img instanceof fabric.Image)) {
  //     return;
  //   }
  //   switch (ad_layer.Type) {
  //     case AdjustmentLayer.Exposure:
  //       break;
  //     case AdjustmentLayer.SolidColor:
  //       break;
  //     case AdjustmentLayer.BrightnessContrast:
  //       this.deleteFilter(img, 'brightness', 'contrast');
  //       img.applyFilters();
  //       break;
  //     case AdjustmentLayer.Vibrance:
  //       break;
  //     case AdjustmentLayer.HueSaturation:
  //       this.deleteFilter(img, 'hue', 'saturation', 'lightness');
  //       img.applyFilters();
  //       break;
  //     case AdjustmentLayer.ColorBalance:
  //       break;
  //     case AdjustmentLayer.BlackWhite:
  //       break;
  //   }
  //   this.updateAdLayer(ad_layer, { ...ad_layer, Hidden: true });
  //   this.data.canvas.value?.renderAll();
  // }
  // unHideAdjustment(ad_layer: AdjustmentLayerType) {
  //   this.addAdjustmentLayerToImage(ad_layer);
  //   this.updateAdLayer(ad_layer, { ...ad_layer, Hidden: false });
  //   this.data.canvas.value?.renderAll();
  // }
  // getAdLayer(id: string, layerId: string) {
  //   return this.data.adustmentLayers.value.find(
  //     (ad) => ad.Id == id && ad.LayerId == layerId
  //   );
  // }
  // updateAdLayer(
  //   target_ad_layer: AdjustmentLayerType,
  //   new_ad_layer: AdjustmentLayerType
  // ) {
  //   const ad_layer = this.getAdLayer(
  //     target_ad_layer.Id,
  //     target_ad_layer.LayerId
  //   );
  //   if (ad_layer) {
  //     Object.assign(target_ad_layer, new_ad_layer);
  //   }
  // }
}
