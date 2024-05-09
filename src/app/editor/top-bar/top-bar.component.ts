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
  project?: Project;
  selectedProject?: Project | null;
  zoom: number = this.data.zoom.getValue();
  zoomActions: boolean = false;
  constructor(private data: DataService) {}
  ngOnInit(): void {
    this.data.openedProjects.subscribe((projects) => {
      this.project = projects[0];
    });
    this.data.zoom.subscribe((zoom) => {
      this.zoom = zoom;
    });
  }

  ngOnDestroy(): void {
    this.data.selectedProject.unsubscribe();
    this.data.projects.unsubscribe();
  }
}
