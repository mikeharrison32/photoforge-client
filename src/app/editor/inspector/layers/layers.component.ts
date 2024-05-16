import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AdjustmentLayer } from 'src/app/core/layers/adjustment/adjustment_layer';
import { Layer } from 'src/app/core/layers/layer';
import { DataService } from 'src/app/core/services/data.service';
import { Project } from 'src/app/types/project';

@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.scss'],
})
export class LayersComponent implements OnInit, AfterViewInit, OnDestroy {
  selectedLayers: Layer[] = [];
  selectedAjLayers: AdjustmentLayer[] = [];
  layers: any[] = [];
  loading: boolean = false;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.layers.subscribe((layers) => {
      this.layers = layers;
    });
  }
  ngAfterViewInit(): void {
    this.data.loadingLayers.subscribe((loading) => {
      this.loading = loading;
    });

    this.data.selectedLayers.subscribe((layers) => {
      this.selectedLayers = layers;
    });

    this.data.selectedAjLayers.subscribe((aj_layers) => {
      this.data.selectedLayers.next([]);
      this.selectedAjLayers = aj_layers;
    });
  }
  setSelectedAjLayer(aj_layer: AdjustmentLayer) {
    this.data.selectedAjLayers.next([aj_layer]);
  }

  ngOnDestroy(): void {}
}
