import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Orientaion } from 'src/app/welcome-page/new-document/enums/Orientaion';
import { Layer } from '../layers/layer';

import { Project } from 'src/app/types/project';
import { Cursor } from '../Cursor';
import { Path } from '../path';
import { AdjustmentLayer } from '../layers/adjustment/adjustment_layer';
import { Selection } from '../../core/selection';
import { History } from '..';
import { Tool } from 'src/app/enums/tool.enum';
import { selectionToolType } from 'src/app/editor/top-bar/tool-properties/rect-select-tool-properties/selectionToolType';
import { shapeToolTypes } from 'src/app/editor/top-bar/tool-properties/shape-tool-properties/shapeToolTypes';
import { paintToolTypes } from 'src/app/editor/top-bar/tool-properties/brush-tool-properties/paintToolTypes';
import { sizePositionToolTypes } from 'src/app/editor/top-bar/tool-properties/move-tool-properties/sizePositionToolTypes';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  selectionCanvas = new BehaviorSubject<HTMLCanvasElement | null>(null);
  displayElem = new BehaviorSubject<HTMLElement | null>(null);
  displayContainer = new BehaviorSubject<HTMLElement | null>(null);
  selectedToolGroup = new BehaviorSubject<string>('sizePosition');
  selectedLayers = new BehaviorSubject<Layer[]>([]);
  projects = new BehaviorSubject<Project[]>([]);
  openedProjects = new BehaviorSubject<Project[]>([]);
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
  zoom = new BehaviorSubject<number>(1);
  contextMenu = new BehaviorSubject<any>({});
  history = new BehaviorSubject<History>(new History());
  isMovingAllowed = new BehaviorSubject<boolean>(true);
  loadingLayers = new BehaviorSubject<boolean>(false);
  openedProject = new BehaviorSubject<Project | null>(null);
  tools = new BehaviorSubject<ToolGroups>({
    sizePositionGroup: {
      selectedTool: 'move',
    },
    paintGroup: {
      selectedTool: 'brush',
    },
    selectGroup: {
      selectedTool: 'rect',
    },
    shapeGroup: {
      selectedTool: 'rect',
    },
  });
}

interface ToolGroups {
  sizePositionGroup: {
    selectedTool: sizePositionToolTypes;
  };
  paintGroup: {
    selectedTool: paintToolTypes;
  };
  selectGroup: {
    selectedTool: selectionToolType;
  };
  shapeGroup: {
    selectedTool: shapeToolTypes;
  };
}

enum PaintTools {
  Brush,
  Eraser,
  Gradient,
}

type Color = {
  fg: string;
  bg: string;
};
