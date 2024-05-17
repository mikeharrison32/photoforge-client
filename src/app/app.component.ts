import {
  Component,
  OnInit,
  HostListener,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { DataService } from './core/services/data.service';
import { Layer, AdjustmentLayer, LayerType } from './types/layer';
import { ApiService } from './core/services/api.service';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { Project } from './types/project';
import { PixelLayer } from './core/layers/pixel-layer';
import { routeAnimations } from './animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private data: DataService,
    private api: ApiService,
    private router: Router,
    private context: ChildrenOutletContexts
  ) {}
  ngOnInit() {}
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}
  getRouteAnimationData() {
    return this.context.getContext('primary')?.route?.snapshot.data?.[
      'animation'
    ];
  }
  @HostListener('document:drop', ['$event'])
  createLayerByDroping(e: any) {
    console.log(e);
  }
}
interface GetProjectResponse {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  modifiedAt: string;
  width: number;
  height: number;
}
interface GetLayersResponse {
  height: null;
  id: string;
  projectId: string;
  title: string;
  url: string;
  userId: string;
  width: number | null;
  x: number | null;
  y: number | null;
}
