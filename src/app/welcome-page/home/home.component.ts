import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  activeView: string = 'window';
  projects: any[] = [];
  loading: boolean = false;
  layers: any[] = [];

  constructor(
    private api: ApiService,
    private data: DataService,
    private router: Router
  ) {}
  setActiveView(vi: string) {
    this.activeView = vi;
  }
  async ngOnInit() {
    this.loading = true;
    this.api
      .getProjects()
      .then((data: any) => {
        this.projects = data;
        this.data.projects.next(data)
        for (let i = 0; i < this.projects.length; i++) {
          const project = this.projects[i];
          this.api
            .getLayers(project.id)
            .then((layers) => {
              this.layers.push(...layers);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      })
      .then(() => {
        console.log(this.layers);
      });
  }
  async loadRecentProjects() {
    const projects = (await this.api.getProjects()) as any;
    this.projects = projects;
  }

  getImageUrl(project: any) {
    const layer = this.layers.filter(
      (layer) => layer.projectId == project.id
    )[0];
    if (layer != undefined && layer.url) {
      return layer.url;
    }
    return '';
  }
  openProject(project: any) {
    console.log(project);
    if (!project) {
      console.log('The clicked project is not present.');
      return;
    }
    // this.data.openedProjects.next([project]);
    // this.data.selectedProject.next(project);
    this.router.navigateByUrl(`/editor/${project.id}`);
  }
}
