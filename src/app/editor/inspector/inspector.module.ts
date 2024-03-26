import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayerComponent } from './layer/layer.component';
import { InspectorComponent } from './inspector.component';
import { AdjustmentLayerComponent } from './adjustment-layer/adjustment-layer.component';
import { DndModule } from 'ngx-drag-drop';
import { PanelComponent } from './panel/panel.component';
import { LayerPropertyComponent } from './layer-property/layer-property.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayersComponent } from './layers/layers.component';
import { LayerModule } from './layer/layer.module';
import { LayerPropertyModule } from './layer-property/layer-property.module';
@NgModule({
  declarations: [
    InspectorComponent,
    AdjustmentLayerComponent,
    PanelComponent,
    LayersComponent,
  ],
  imports: [
    CommonModule,
    DndModule,
    SharedModule,
    LayerModule,
    LayerPropertyModule,
  ],
  exports: [InspectorComponent],
})
export class InspectorModule {}
