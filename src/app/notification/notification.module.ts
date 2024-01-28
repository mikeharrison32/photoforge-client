import { NgModule } from '@angular/core';
import { NotificationComponent } from './notification.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NotificationComponent],
  exports: [NotificationComponent],
  imports: [CommonModule, FormsModule],
  providers: [],
})
export class NotificationModule {}
