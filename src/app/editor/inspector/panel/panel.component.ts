import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent {
  @Input() Tabs!: string[];
  selectedTab: number = 0;
  setSelectedTab(index: number) {
    this.selectedTab = index;
  }
}
