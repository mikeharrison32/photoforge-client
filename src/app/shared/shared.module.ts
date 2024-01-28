import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { HttpClientModule } from '@angular/common/http';
import { VolumeComponent } from './components/volume/volume.component';
import { InputComponent } from './components/input/input.component';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from './components/select/select.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DestroyableDirective } from './directives/destroyable.directive';
import { GroupFolderComponent } from './components/group-folder/group-folder.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [
    ButtonComponent,
    VolumeComponent,
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    DestroyableDirective,
    GroupFolderComponent,
    ColorPickerComponent,
  ],
  imports: [CommonModule, HttpClientModule, FormsModule, ColorPickerModule],
  providers: [],
  exports: [
    ButtonComponent,
    VolumeComponent,
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    GroupFolderComponent,
    DestroyableDirective,
    ColorPickerComponent,
  ],
})
export class SharedModule {}
