import { Injectable, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import {
  AdjustmentLayer,
  AdjustmentLayerType,
  Layer,
  LayerType,
} from '../../types/layer';
import { DataService } from './data.service';
import { fabric } from 'fabric';
import { Filter } from 'src/app/enums/filter';
import { StateService } from './state.service';
import { TypeLayer } from '../layers/type-layer';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LayerService {
  constructor(
    private data: DataService,
    private stateService: StateService // private renderer: Renderer2
  ) {}
  createTypeLayer(text?: string, projectId?: string) {
    // const displayElem = this.data.displayElem.getValue();
    // let lastIndex =
    //   this.data.layers.getValue().filter((lr) => lr instanceof TypeLayer)
    //     .length + 1;
    // const textLayer = new TypeLayer(
    //   this.renderer,
    //   displayElem!,
    //   `${Math.random()}`,
    //   'Type layer ' + lastIndex,
    //   this.data.selectedProject.getValue()?.Id || projectId || 'aaa',
    //   text
    // );
    // this.data.layers.next([...this.data.layers.getValue(), textLayer]);
  }
}
