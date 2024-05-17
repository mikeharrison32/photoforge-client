import { NgModule } from '@angular/core';
import { SliderComponent } from './slider.component';
import { TrackModule } from '../track/track.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SliderComponent],
  exports: [SliderComponent],
  imports: [TrackModule, FormsModule],
})
export class SliderModule {}
