import { NgModule } from '@angular/core';
import { ToolBoxComponent } from './tool-box/tool-box.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ToolPropertiesComponent } from './top-bar/tool-properties/tool-properties.component';
import { MenusComponent } from './top-bar/menus/menus.component';
import { EditorComponent } from './editor.component';
import { ToolPropertiesModule } from './top-bar/tool-properties/tool-properties.module';
import { ToolBoxModule } from './tool-box/tool-box.module';
import { InspectorModule } from './inspector/inspector.module';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NewDocumentModule } from '../welcome-page/new-document/new-document.module';
import { TopBarModule } from './top-bar/top-bar.module';

@NgModule({
  declarations: [EditorComponent, ToolBoxComponent],
  imports: [
    TopBarModule,
    ToolBoxModule,
    InspectorModule,
    SharedModule,
    CommonModule,
    NewDocumentModule,
    SharedModule,
  ],
  exports: [],
})
export class EditorModule {}
