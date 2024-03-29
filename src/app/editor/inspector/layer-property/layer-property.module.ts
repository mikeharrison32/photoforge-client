import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DndModule } from 'ngx-drag-drop';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayerPropertyComponent } from './layer-property.component';
import { PixelLayerPropertyComponent } from './pixel-layer-property/pixel-layer-property.component';
import { FormsModule } from '@angular/forms';
import { TypeLayerPropertyComponent } from './type-layer-property/type-layer-property.component';

@NgModule({
  declarations: [
    LayerPropertyComponent,
    PixelLayerPropertyComponent,
    TypeLayerPropertyComponent,
  ],
  imports: [CommonModule, DndModule, SharedModule],
  exports: [
    LayerPropertyComponent,
    PixelLayerPropertyComponent,
    TypeLayerPropertyComponent,
  ],
})
export class LayerPropertyModule {}
