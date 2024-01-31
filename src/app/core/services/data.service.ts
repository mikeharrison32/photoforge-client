import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Orientaion } from 'src/app/welcome-page/new-document/enums/Orientaion';
import { Layer } from '../layers/layer';

import { Project } from 'src/app/types/project';
import { Cursor } from '../Cursor';
import { Selection } from '../selection';
import { Path } from '../path';
import { AdjustmentLayer } from '../layers/adjustment/adjustment_layer';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  displayElem = new BehaviorSubject<HTMLElement | null>(null);
  selectedTool = new BehaviorSubject<string>('none');
  selectedLayers = new BehaviorSubject<Layer[]>([]);
  projects = new BehaviorSubject<Project[]>([]);
  selectedProject = new BehaviorSubject<Project | null>(null);

  orientaion = new BehaviorSubject<Orientaion>(Orientaion.Landscape);
  layers = new BehaviorSubject<Layer[]>([]);
  canvas = new BehaviorSubject<fabric.Canvas | null>(null);
  newMenuClick = new BehaviorSubject<boolean>(false);
  shortcutsEnabled = new BehaviorSubject<boolean>(true);
  selectedColors = new BehaviorSubject<Color>({ fg: '#fff', bg: '#000' });
  paths = new BehaviorSubject<Path[]>([]);
  currentPath = new BehaviorSubject<Path | null>(null);
  cursor = new BehaviorSubject<Cursor | null>(null);
  currentSelection = new BehaviorSubject<Selection | null>(null);
  selectedAjLayers = new BehaviorSubject<AdjustmentLayer[]>([]);
}

type Color = {
  fg: string;
  bg: string;
};
