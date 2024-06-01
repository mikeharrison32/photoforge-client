import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SizePostionPropertiesComponent } from './size-postion-properties/size-postion-properties.component';
import { SelectionPropertiesComponent } from './selection-properties/selection-properties.component';
import { PaintPropertiesComponent } from './paint-properties/paint-properties.component';
import { AdjustPropertiesComponent } from './adjust-properties/adjust-properties.component';
import { TextToolPropertiesComponent } from './text-tool-properties/text-tool-properties.component';
import { ShapeToolPropertiesComponent } from './shape-tool-properties/shape-tool-properties.component';
import { ToolPropertiesComponent } from './tool-properties.component';
import { ToolBarHeaderComponent } from './tool-bar-header/tool-bar-header.component';
import { SliderModule } from 'src/app/slider/slider.module';
@NgModule({
  declarations: [
    SizePostionPropertiesComponent,
    SelectionPropertiesComponent,

    PaintPropertiesComponent,
    AdjustPropertiesComponent,

    TextToolPropertiesComponent,
    ShapeToolPropertiesComponent,

    ToolPropertiesComponent,
    ToolBarHeaderComponent,
  ],
  imports: [CommonModule, SharedModule, SliderModule],
  exports: [
    SizePostionPropertiesComponent,
    SelectionPropertiesComponent,

    PaintPropertiesComponent,
    AdjustPropertiesComponent,

    TextToolPropertiesComponent,
    ShapeToolPropertiesComponent,

    ToolPropertiesComponent,
  ],
})
export class ToolPropertiesModule {}
