import { Component, Input } from '@angular/core';
import { HueSaturationLightnees } from 'src/app/core/layers/adjustment/hue_saturation_lightnees';

@Component({
  selector: 'app-hue-saturation',
  templateUrl: './hue-saturation.component.html',
  styleUrls: ['./hue-saturation.component.scss'],
})
export class HueSaturationComponent {
  @Input() adjustmentLayer?: HueSaturationLightnees;

  onHueChange(value: any) {
    this.adjustmentLayer?.set({
      hue: value * 0.5,
    });
  }
  onSaturationChange(value: any) {
    this.adjustmentLayer?.set({
      saturation: value / 100,
    });
  }
  onLightnessChange(value: any) {
    this.adjustmentLayer?.set({
      lightnees: value,
    });
  }
}
