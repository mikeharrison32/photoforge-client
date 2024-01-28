import { Component } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { Selection } from 'src/app/core/selection';
@Component({
  selector: 'app-pen-tool-properties',
  templateUrl: './pen-tool-properties.component.html',
  styleUrls: ['./pen-tool-properties.component.scss'],
})
export class PenToolPropertiesComponent {
  constructor(private data: DataService) {}
  makeSelection() {
  }
  mask() {}
  makeShape() {

  }
}
