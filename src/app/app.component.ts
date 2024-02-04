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
import { Router } from '@angular/router';
import { Project } from './types/project';
import { PixelLayer } from './core/layers/pixel-layer';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  showNav: boolean = false;
  constructor(
    private data: DataService,
    private api: ApiService,
    private router: Router
  ) {}
  ngOnInit() {
    this.data.showNav.subscribe((showNav) => {
      this.showNav = showNav;
    });
  }
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {
    this.data.showNav.unsubscribe();
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
