import { Component, Input } from '@angular/core';
import { Exposure } from 'src/app/core/layers/adjustment/exposure';

@Component({
  selector: 'app-exposure',
  templateUrl: './exposure.component.html',
  styleUrls: ['./exposure.component.scss'],
})
export class ExposureComponent {
  @Input() adjustmentLayer?: Exposure;
  onExposureChange(value: any) {
    this.adjustmentLayer?.set({
      exposure: value / 100,
    });
  }
  onExposureOffsetChange(value: any) {
    this.adjustmentLayer?.set({
      offset: value / 100,
    });
  }
  onExposureGammaCorrectionChange(value: any) {
    this.adjustmentLayer?.set({
      gammaCorrection: value / 100,
    });
  }
}
