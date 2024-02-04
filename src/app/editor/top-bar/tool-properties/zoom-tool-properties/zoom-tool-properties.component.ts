import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-zoom-tool-properties',
  templateUrl: './zoom-tool-properties.component.html',
  styleUrls: ['./zoom-tool-properties.component.scss'],
})
export class ZoomToolPropertiesComponent implements OnInit {
  zoom: number = 1;
  constructor(private data: DataService) {}
  ngOnInit(): void {
    this.data.zoom.subscribe((zoom) => {
      this.zoom = zoom;
    });
  }
}
