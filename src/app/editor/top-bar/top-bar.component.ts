import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Layer } from 'src/app/core/layers/layer';
import { DataService } from 'src/app/core/services/data.service';
import { Project } from 'src/app/types/project';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  selectedProject?: Project | null;
  constructor(private data: DataService) {}
  ngOnInit(): void {
    this.data.openedProjects.subscribe((projects) => {
      this.projects = projects;
      console.log(projects);
    });
    this.data.selectedProject.subscribe((project) => {
      this.selectedProject = project;
    });
    this.setSelectedProject(this.projects[0]);
  }
  setSelectedProject(project: Project) {
    this.data.selectedProject.next(project);
  }
  closeProject(id: string) {
    const currentProjectsValue = this.data.projects.getValue();
    const updatedProjectsValue: Project[] = [];
    const currentLayersValue = this.data.layers.getValue();
    const updatedLayersValue: Layer[] = [];

    currentProjectsValue.forEach((p) => {
      if (p.Id != id) {
        updatedProjectsValue.push(p);
      }
    });

    currentLayersValue.forEach((layer) => {
      if (layer.projectId != id) {
        updatedLayersValue.push(layer);
      }
    });

    this.data.layers.getValue().forEach((layer) => {
      if (layer.projectId == id) {
        layer.remove();
      }
    });
    this.data.projects.next(updatedProjectsValue);
    this.data.layers.next(updatedLayersValue);
    this.data.selectedLayers.next([]);

    if (this.data.projects.value.length > 0) {
      this.data.selectedProject.next(this.data.projects.value[0]);
    } else {
      this.data.selectedProject.next(null);
    }
  }
  ngOnDestroy(): void {
    this.data.selectedProject.unsubscribe();
    this.data.projects.unsubscribe();
  }
}
