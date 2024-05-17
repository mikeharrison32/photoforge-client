import { Component, Input } from '@angular/core';
import { Vibrance } from 'src/app/core/layers/adjustment/vibrance';

@Component({
  selector: 'app-vibrance',
  templateUrl: './vibrance.component.html',
  styleUrls: ['./vibrance.component.scss'],
})
export class VibranceComponent {
  @Input() adjustmentLayer?: Vibrance;
  onVibranceChange(value: any) {
    this.adjustmentLayer?.set({
      vibrance: value,
    });
  }
  onSaturationChange(value: any) {
    this.adjustmentLayer?.set({
      saturation: value / 100,
    });
  }
}
