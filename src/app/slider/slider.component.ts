import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent {
  value: number = 0;
  onTrackHandleChange(value: number) {
    this.value = value;
  }
  @Input() label?: string;
}
