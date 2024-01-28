import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit, OnChanges {
  @Input() Items?: string[];
  @Input() selectedItem?: string;
  @Output() onSelectedItemChange = new EventEmitter<string>();
  arrowIconClicked: boolean = false;
  ngOnInit(): void {
    if (!this.selectedItem) {
      this.selectedItem = this.Items![0];
    }
    if (this.selectedItem && this.selectedItem.length > 20) {
      this.selectedItem = this.selectedItem.slice(0, 19) + '...';
    }
  }
  ngOnChanges() {
    if (this.selectedItem && this.selectedItem.length > 20) {
      this.selectedItem = this.selectedItem!.slice(0, 19) + '...';
    }
  }
  toggleArrowIcon() {
    if (this.arrowIconClicked) {
      this.arrowIconClicked = false;
    }
  }
  setSelectedItem(item: string) {
    this.selectedItem = item;
    this.onSelectedItemChange.emit(item);
    this.arrowIconClicked = false;
  }
}
