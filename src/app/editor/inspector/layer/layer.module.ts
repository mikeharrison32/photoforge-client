import { NgModule } from '@angular/core';

import { LayerComponent } from './layer.component';
import { LayerContextMenuComponent } from './layer-context-menu/layer-context-menu..component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [LayerContextMenuComponent, LayerComponent],
  declarations: [LayerComponent, LayerContextMenuComponent],
  providers: [],
})
export class LayerModule {}
