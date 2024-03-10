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
  loading: boolean = false;

  constructor(private api: ApiService) {}
  setActiveView(vi: string) {
    this.activeView = vi;
  }
  ngOnInit() {
    this.loading = true;
    const projects = this.api
      .getProjects()
      .then((data: any) => {
        this.projects = data;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
      });
  }
  async loadRecentProjects() {
    const projects = (await this.api.getProjects()) as any;
    this.projects = projects;
  }
}
