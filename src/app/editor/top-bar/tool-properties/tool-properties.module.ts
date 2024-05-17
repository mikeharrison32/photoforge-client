import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrushComponent } from './brush/brush.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MoveToolPropertiesComponent } from './move-tool-properties/move-tool-properties.component';
import { LassoToolPropertiesComponent } from './lasso-tool-properties/lasso-tool-properties.component';
import { RectSelectToolPropertiesComponent } from './rect-select-tool-properties/rect-select-tool-properties.component';
import { QuickSelectToolPropertiesComponent } from './quick-select-tool-properties/quick-select-tool-properties.component';
import { CropToolPropertiesComponent } from './crop-tool-properties/crop-tool-properties.component';
import { EyedropToolPropertiesComponent } from './eyedrop-tool-properties/eyedrop-tool-properties.component';
import { SpotHealingToolPropertiesComponent } from './spot-healing-tool-properties/spot-healing-tool-properties.component';
import { BrushToolPropertiesComponent } from './brush-tool-properties/brush-tool-properties.component';
import { CloneStampToolPropertiesComponent } from './clone-stamp-tool-properties/clone-stamp-tool-properties.component';
import { HistoryBrushToolPropertiesComponent } from './history-brush-tool-properties/history-brush-tool-properties.component';
import { EraserToolPropertiesComponent } from './eraser-tool-properties/eraser-tool-properties.component';
import { GradientToolPropertiesComponent } from './gradient-tool-properties/gradient-tool-properties.component';
import { BlurToolPropertiesComponent } from './blur-tool-properties/blur-tool-properties.component';
import { DodgeToolPropertiesComponent } from './dodge-tool-properties/dodge-tool-properties.component';
import { PenToolPropertiesComponent } from './pen-tool-properties/pen-tool-properties.component';
import { TextToolPropertiesComponent } from './text-tool-properties/text-tool-properties.component';
import { ShapeToolPropertiesComponent } from './shape-tool-properties/shape-tool-properties.component';
import { HandToolPropertiesComponent } from './hand-tool-properties/hand-tool-properties.component';
import { ZoomToolPropertiesComponent } from './zoom-tool-properties/zoom-tool-properties.component';
import { ToolPropertiesComponent } from './tool-properties.component';
import { ToolBarHeaderComponent } from './tool-bar-header/tool-bar-header.component';
import { DropDownComponent } from './drop-down/drop-down.component';
import { SliderModule } from 'src/app/slider/slider.module';

@NgModule({
  declarations: [
    BrushComponent,
    MoveToolPropertiesComponent,
    LassoToolPropertiesComponent,
    RectSelectToolPropertiesComponent,
    QuickSelectToolPropertiesComponent,
    CropToolPropertiesComponent,
    EyedropToolPropertiesComponent,
    SpotHealingToolPropertiesComponent,
    BrushToolPropertiesComponent,
    CloneStampToolPropertiesComponent,
    HistoryBrushToolPropertiesComponent,
    EraserToolPropertiesComponent,
    GradientToolPropertiesComponent,
    BlurToolPropertiesComponent,
    DodgeToolPropertiesComponent,
    PenToolPropertiesComponent,
    TextToolPropertiesComponent,
    ShapeToolPropertiesComponent,
    HandToolPropertiesComponent,
    ZoomToolPropertiesComponent,
    ToolPropertiesComponent,
    ToolBarHeaderComponent,
    DropDownComponent,
  ],
  imports: [CommonModule, SharedModule, SliderModule],
  exports: [
    BrushComponent,
    MoveToolPropertiesComponent,
    LassoToolPropertiesComponent,
    RectSelectToolPropertiesComponent,
    QuickSelectToolPropertiesComponent,
    CropToolPropertiesComponent,
    EyedropToolPropertiesComponent,
    SpotHealingToolPropertiesComponent,
    BrushToolPropertiesComponent,
    CloneStampToolPropertiesComponent,
    HistoryBrushToolPropertiesComponent,
    EraserToolPropertiesComponent,
    GradientToolPropertiesComponent,
    BlurToolPropertiesComponent,
    DodgeToolPropertiesComponent,
    PenToolPropertiesComponent,
    TextToolPropertiesComponent,
    ShapeToolPropertiesComponent,
    HandToolPropertiesComponent,
    ZoomToolPropertiesComponent,
    ToolPropertiesComponent,
  ],
})
export class ToolPropertiesModule {}
