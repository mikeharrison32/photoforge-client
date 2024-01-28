import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() text?: string;
  checked?: boolean = false;
  checkBox() {
    this.checked = this.checked ? false : true;
  }
}
