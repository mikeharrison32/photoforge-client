import { NgModule } from '@angular/core';
import { NewDocumentComponent } from './new-document.component';
import { PresetDetailComponent } from './preset-detail/preset-detail.component';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './template/template.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NewDocumentComponent,
    PresetDetailComponent,
    TemplateComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [NewDocumentComponent],
})
export class NewDocumentModule {}
