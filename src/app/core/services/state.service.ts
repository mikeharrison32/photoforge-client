import { Injectable } from '@angular/core';
import { AdjustmentLayerType, Layer } from 'src/app/types/layer';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  constructor(private data: DataService) {}
  // private history: StateHistory[] = [
  //   {
  //     // layers: this.data.layers.getValue(),
  //     // ad_layers: this.data.adustmentLayers.getValue(),
  //   },
  // ];
  // currentStateIndex: number = 2;
  // undo() {
  //   if (this.history.length - this.currentStateIndex < 0) {
  //     return;
  //   }
  //   console.log('index', this.history.length - this.currentStateIndex);
  //   const layers =
  //     this.history[this.history.length - this.currentStateIndex].layers;
  //   const ad_layers =
  //     this.history[this.history.length - this.currentStateIndex].ad_layers;
  //   // this.data.layers.next(layers);
  //   // this.data.adustmentLayers.next(ad_layers);
  //   this.currentStateIndex += 1;
  // }
  // redo() {
  //   if (
  //     this.history.length - this.currentStateIndex >=
  //     this.history.length - 1
  //   ) {
  //     return;
  //   }
  //   console.log('index', this.history.length - this.currentStateIndex);
  //   console.log(
  //     this.history[this.history.length - this.currentStateIndex + 1].layers
  //   );
  //   const layers =
  //     this.history[this.history.length - this.currentStateIndex + 2].layers;
  //   const ad_layers =
  //     this.history[this.history.length - this.currentStateIndex + 2].ad_layers;
  //   this.data.layers.next(layers);
  //   this.data.adustmentLayers.next(ad_layers);
  //   this.currentStateIndex -= 1;
  // }
  // updateState() {
  //   console.log('state updated');
  //   const state: StateHistory = {
  //     layers: this.data.layers.getValue(),
  //     ad_layers: this.data.adustmentLayers.getValue(),
  //   };
  //   this.history.push(state);
  //   console.log(this.history);
  // }
}

type StateHistory = {
  layers: Layer[];
  ad_layers: AdjustmentLayerType[];
};
