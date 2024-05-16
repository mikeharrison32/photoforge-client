import { Component, Input } from '@angular/core';
import { ColorBalance } from 'src/app/core/layers/adjustment/color_balance';

@Component({
  selector: 'app-color-balance',
  templateUrl: './color-balance.component.html',
  styleUrls: ['./color-balance.component.scss'],
})
export class ColorBalanceComponent {
  @Input() adjustmentLayer?: ColorBalance;
  onCbRedChange(value: number) {
    this.adjustmentLayer?.set({
      red: value,
    });
  }
  onCbBlueChange(value: number) {
    this.adjustmentLayer?.set({
      blue: value,
    });
  }
  onCbGreenChange(value: number) {
    this.adjustmentLayer?.set({
      green: value,
    });
  }
}
