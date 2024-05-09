import { NgModule } from '@angular/core';
import { ToolBoxComponent } from './tool-box/tool-box.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ToolPropertiesModule } from './top-bar/tool-properties/tool-properties.module';
import { MenusComponent } from './top-bar/menus/menus.component';
import { EditorComponent } from './editor.component';
import { ToolBoxModule } from './tool-box/tool-box.module';
import { InspectorModule } from './inspector/inspector.module';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NewDocumentModule } from '../welcome-page/new-document/new-document.module';
import { TopBarModule } from './top-bar/top-bar.module';
import { CropRectComponent } from './crop-rect/crop-rect.component';

@NgModule({
  declarations: [EditorComponent, ToolBoxComponent, CropRectComponent],
  imports: [
    TopBarModule,
    ToolBoxModule,
    InspectorModule,
    SharedModule,
    CommonModule,
    NewDocumentModule,
    SharedModule,
    ToolPropertiesModule
  ],
  exports: [],
})
export class EditorModule {}
