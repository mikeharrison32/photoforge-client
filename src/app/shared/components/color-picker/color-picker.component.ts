import {
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent {
  fgColor: string = '#fff';
  bgColor: string = '#000';
  @Input() Active: boolean = false;
  @Input() color: string = this.fgColor;
  @Output() colorChange = new EventEmitter<string>();

  onColorChange(e: any) {
    this.fgColor = e;
    this.colorChange.emit(e);
  }
  close() {
    this.Active = false;
  }
}
