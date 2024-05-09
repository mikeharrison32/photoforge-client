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
  // groups: Group[] = [];
  layers: any[] = [];
  selectedProject?: Project | null;
  loading: boolean = false;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.layers.subscribe((layers) => {
      this.layers = this.data.layers
        .getValue()
        .filter(
          (layer) => layer.projectId == this.selectedProject?.Id || 'aaa'
        );
    });
  }
  ngAfterViewInit(): void {
    this.data.loadingLayers.subscribe((loading) => {
      this.loading = loading;
    });

    this.data.selectedLayers.subscribe((layers) => {
      this.selectedLayers = layers;
    });
    this.data.selectedProject.subscribe((project) => {
      this.selectedProject = project;
      this.layers = this.data.layers
        .getValue()
        .filter((layer) => layer.projectId == project?.Id);
      const displayElem = this.data.displayElem.getValue();
      displayElem!.style.width = project!.width + 'px';
      displayElem!.style.height = project!.height + 'px';
    });
    this.data.selectedAjLayers.subscribe((aj_layers) => {
      this.data.selectedLayers.next([]);
      this.selectedAjLayers = aj_layers;
    });
  }
  setSelectedAjLayer(aj_layer: AdjustmentLayer) {
    this.data.selectedAjLayers.next([aj_layer]);
  }
  onLockClick(e: any, lr: Layer) {
    // if (lr?.Locked) {
    //   this.layerService.unLockLayer(lr);
    // } else {
    //   this.layerService.lockLayer(lr);
    // }
  }
  onHideClick(e: any, lr: Layer) {
    // if (lr?.Hidden) {
    //   this.layerService.unHideLayer(lr);
    // } else {
    //   this.layerService.hideLayer(lr);
    // }
  }
  onDrag(e: any) {
    // e.event.target.style.background = 'blue';
    // console.log(e);
  }
  onDrop(e: any) {
    console.log(e);
  }
  ngOnDestroy(): void {}
}
