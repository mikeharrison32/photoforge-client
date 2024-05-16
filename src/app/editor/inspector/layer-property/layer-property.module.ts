import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DndModule } from 'ngx-drag-drop';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayerPropertyComponent } from './layer-property.component';
import { PixelLayerPropertyComponent } from './pixel-layer-property/pixel-layer-property.component';
import { FormsModule } from '@angular/forms';
import { TypeLayerPropertyComponent } from './type-layer-property/type-layer-property.component';
import { SliderModule } from 'src/app/slider/slider.module';
import { BrightnessContrastComponent } from './brightness-contrast/brightness-contrast.component';
import { HueSaturationComponent } from './hue-saturation/hue-saturation.component';
import { ExposureComponent } from './exposure/exposure.component';
import { ColorBalanceComponent } from './color-balance/color-balance.component';
import { VibranceComponent } from './vibrance/vibrance.component';
import { ShapeLayerPropertyComponent } from './shape-layer-property/shape-layer-property.component';

@NgModule({
  declarations: [
    LayerPropertyComponent,
    PixelLayerPropertyComponent,
    TypeLayerPropertyComponent,
    BrightnessContrastComponent,
    HueSaturationComponent,
    ExposureComponent,
    ColorBalanceComponent,
    VibranceComponent,
    ShapeLayerPropertyComponent,
  ],
  imports: [CommonModule, DndModule, SharedModule, SliderModule],
  exports: [
    LayerPropertyComponent,
    PixelLayerPropertyComponent,
    TypeLayerPropertyComponent,
  ],
})
export class LayerPropertyModule {}
