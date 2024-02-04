import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  activeView: string = 'window';
  projects: any[] = [];

  constructor(private api: ApiService) {}
  setActiveView(vi: string) {
    this.activeView = vi;
  }
  async ngOnInit() {
    const projects = (await this.api.getProjects()) as any;
    this.projects = projects;
  }
  async loadRecentProjects() {
    const projects = (await this.api.getProjects()) as any;
    this.projects = projects;
  }
}
