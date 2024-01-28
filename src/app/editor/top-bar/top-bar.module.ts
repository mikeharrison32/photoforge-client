import { NgModule } from '@angular/core';

import { TopBarComponent } from './top-bar.component';
import { MenusComponent } from './menus/menus.component';
import { ToolPropertiesComponent } from './tool-properties/tool-properties.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolPropertiesModule } from './tool-properties/tool-properties.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [TopBarComponent, MenusComponent],
  imports: [CommonModule, FormsModule, ToolPropertiesModule, SharedModule],
  exports: [TopBarComponent, MenusComponent],
  providers: [],
})
export class TopBarModule {}
