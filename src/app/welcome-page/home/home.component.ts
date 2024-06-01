import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { map, pipe, tap } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { DataService } from 'src/app/core/services/data.service';
import { LoadingService } from 'src/app/core/services/loading.service';

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
  selectedProjects: any[] = [];
  deleteProjectWarn: boolean = false;

  constructor(
    private api: ApiService,
    private data: DataService,
    private router: Router,
    private renderer: Renderer2,
    private loadingService: LoadingService
  ) {}
  setActiveView(vi: string) {
    this.activeView = vi;
  }

  onRightClick(projectId: string, e: any) {
    console.log(projectId, e);
  }
  deleteProjects() {
    this.deleteProjectWarn = false;
    const projects = this.selectedProjects;
    console.log('projects to delete: ', projects);
    const results: Promise<any>[] = [];
    this.loadingService.startLoading(
      `Deleting ${this.selectedProjects.length > 1 ? 'projects' : 'project'}...`
    );
    projects.forEach((project) => {
      console.log('Deleting Project ' + project.name + '...');
      const result = this.api.deleteProject(project.id);
      results.push(result);
    });
    Promise.all(results)
      .then((result) => {
        this.loadingService.stopLoading();
        this.loadProjects();
      })
      .catch((err) => {
        this.loadingService.stopLoading();
        console.log(err);
      });
  }
  cancelProjectsDeletion() {
    this.deleteProjectWarn = false;
  }
  onProjectClick(project: any, e: any) {
    if (e.ctrlKey) {
      if (this.selectedProjects.includes(project)) {
        this.selectedProjects.splice(this.selectedProjects.indexOf(project));
      } else {
        this.selectedProjects.push(project);
      }
    } else {
      this.selectedProjects = [project];
    }
  }
  async ngOnInit() {
    this.loading = true;

    this.renderer.listen(document, 'keydown', (e) => {
      if (e.code == 'Delete' && this.selectedProjects.length > 0) {
        this.deleteProjectWarn = true;
      } else if (e.code == 'Enter' && this.selectedProjects.length == 1) {
        const projectToOpen = this.selectedProjects[0];
        this.router.navigateByUrl(`editor/${projectToOpen.id}`);
      }
    });
    this.loadProjects();
  }
  private loadProjects() {
    this.api
      .getProjects()
      .pipe(map((res) => res))
      .subscribe({
        next: (data) => {
          // this.projects = data as any;
          (data as any).forEach((project: any) => {
            this.api
              .getLayers(project.id)
              .then((layers: any) => {
                this.layers.push(...layers);
                this.projects.push(project);
              })
              .catch((err: any) => {
                console.log(err);
              });
          });
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          console.log(err.status);
          if (err.status == 401) {
          }
        },
      });
  }

  async loadRecentProjects() {
    const projects = (await this.api.getProjects()) as any;
    return projects;
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
