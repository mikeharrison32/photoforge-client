import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
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
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private data: DataService,
    private api: ApiService,
    private router: Router
  ) {}
  ngOnInit() {
    this.api
      .getProjects()
      .then((res: any) => {
        console.log('projects: ', res);
        res.forEach((proj: GetProjectResponse) => {
          const project: Project = {
            Id: proj.id,
            UserId: proj.userId,
            Title: proj.title,
            Width: proj.width,
            Height: proj.height,
            CreatedAt: proj.createdAt,
            ModifiedAt: proj.modifiedAt,
          };
          this.data.projects.value.push(project);
        });
      })
      .catch((err) => console.log('error: ', err));

    this.api
      .getLayers()
      .then((res: any) => {
        res.forEach((lr: GetLayersResponse) => {
          const layer: Layer = {
            Type: LayerType.Pixel,
            Id: lr.id,
            ProjectId: lr.projectId,
            Title: lr.title,
            Url: lr.url,
            X: 0,
            Y: 0,
            stackIndex: 0,
          };
        });
      })
      .catch((err: any) => console.log('err: ', err));
  }
  ngAfterViewInit(): void {

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
