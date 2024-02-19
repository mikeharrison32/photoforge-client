import { Component } from '@angular/core';

@Component({
  selector: 'app-lasso-tool-properties',
  templateUrl: './lasso-tool-properties.component.html',
  styleUrls: ['./lasso-tool-properties.component.scss'],
})
export class LassoToolPropertiesComponent {
  selectedSelectionOption: 'normal' | 'add' | 'subtract' | 'intersect' =
    'normal';
  setSelectionOption(option: 'normal' | 'add' | 'subtract' | 'intersect') {
    this.selectedSelectionOption = option;
  }
}
