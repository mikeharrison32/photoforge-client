import { Component, OnDestroy, OnInit } from '@angular/core';
import { Layer } from 'src/app/core/layers/layer';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-move-tool-properties',
  templateUrl: './move-tool-properties.component.html',
  styleUrls: ['./move-tool-properties.component.scss'],
})
export class MoveToolPropertiesComponent implements OnInit, OnDestroy {
  canvas?: fabric.Canvas | null;
  selectedLayers?: Layer[];
  constructor(private data: DataService) {}
  ngOnInit(): void {
    this.data.selectedLayers.subscribe((sl) => {
      this.selectedLayers = sl;
    });
  }
  ngOnDestroy(): void {
    // this.data.selectedLayers.unsubscribe();
  }
  centerSelectedObjVertical() {
    this.selectedLayers?.forEach((layer) => {
      const display = this.data.displayElem.getValue();

      layer.canvas!.style.top =
        display!.clientHeight / 2 - layer.canvas!.clientHeight / 2 + 'px';
    });
  }
  centerSelectedObjHorizontal() {
    this.selectedLayers?.forEach((layer) => {
      const display = this.data.displayElem.getValue();

      layer.canvas!.style.left =
        display!.clientWidth / 2 - layer.canvas!.clientWidth / 2 + 'px';
    });
  }
  alignTop() {
    this.selectedLayers?.forEach((layer) => {
      layer.canvas!.style.top = '0px';
    });
  }
  alignLeft() {
    this.selectedLayers?.forEach((layer) => {
      layer.canvas!.style.left = '0px';
    });
  }
  alignRight() {
    this.selectedLayers?.forEach((layer) => {
      const display = this.data.displayElem.getValue();
      layer.canvas!.style.left =
        display!.clientWidth - layer.canvas!.clientWidth + 'px';
    });
  }
  alignBottom() {
    const display = this.data.displayElem.getValue();

    this.selectedLayers?.forEach((layer) => {
      layer.canvas!.style.top =
        display!.clientHeight - layer.canvas!.clientHeight + 'px';
    });
  }
}
