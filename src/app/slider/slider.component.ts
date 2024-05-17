import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent {
  value: number = 0;
  @Input() label?: string;
  @Input() Image?: string;
  @Output() onSliderChange = new EventEmitter<number>();
  onTrackHandleChange(value: number) {
    this.value = value;
    this.onSliderChange.emit(value);
  }
  onInputChange(e: any) {
    console.log(e);
    console.log(e.target.value);
  }
}
