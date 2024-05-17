import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tool-bar-header',
  templateUrl: './tool-bar-header.component.html',
  styleUrls: ['./tool-bar-header.component.scss'],
})
export class ToolBarHeaderComponent {
  @Input() headerName?: string;
}
