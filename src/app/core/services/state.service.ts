import { Injectable } from '@angular/core';
import { AdjustmentLayerType, Layer } from 'src/app/types/layer';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  undoStates: Function[] = [];
  redoStates: Function[] = [];
  constructor() {}
  undo() {
    const lastState = this.undoStates.pop();
    if (lastState) {
      console.log(lastState);
      lastState();
    }
  }
  redo() {}
  setState(undoAction: Function, redoAction: Function) {
    this.undoStates.push(undoAction);
    this.redoStates.push(redoAction);
  }
}
