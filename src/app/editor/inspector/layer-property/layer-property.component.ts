import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
@Component({
  selector: 'app-layer-property',
  templateUrl: './layer-property.component.html',
  styleUrls: ['./layer-property.component.scss'],
})
export class LayerPropertyComponent implements OnInit, OnDestroy {
  selectedLayer?: any;
  selectedAdjustmentLayer?: any;

  constructor(private data: DataService, private ngZone: NgZone) {}
  ngOnInit() {
    this.data.selectedLayers.subscribe((sl_layers) => {
      this.selectedLayer = sl_layers[0];
    });
    this.data.selectedAjLayers.subscribe((aj_layers) => {
      this.selectedAdjustmentLayer = aj_layers[0];
    });
  }

  ngOnDestroy(): void {}
}
