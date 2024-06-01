import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../core/services/token.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from '../core/services/api.service';
import { Project } from '../types/project';
import { DataService } from '../core/services/data.service';
import { StateService } from '../core/services/state.service';
import { PixelLayer } from '../core/layers/pixel-layer';
import { LoadingService } from '../core/services/loading.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  selectedTab: string = 'Home';
  activeTab: string = 'Home';
  createNewBtnClicked: boolean = false;
  projects: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenService: TokenService,
    private jwtHelper: JwtHelperService,
    private api: ApiService,
    private data: DataService,
    private stateService: StateService,
    private renderer: Renderer2,
    private loadingService: LoadingService
  ) {}
  ngOnInit() {
    const data = this.jwtHelper.decodeToken(
      this.tokenService.getAccessToken()!
    );
    console.log(data);
  }
  setActiveElement(el: string) {
    this.selectedTab = el;
    this.activeTab = el;
  }
  onCloseBtnClick(e: any) {
    console.log('close cli');
    this.createNewBtnClicked = false;
  }
  displayNewDocument() {
    this.createNewBtnClicked = true;
  }
  onOpenFileBtnChange(e: any) {
    this.loadingService.startLoading('Uploading Image...');
    const file = e.target.files[0];
    this.api.createProjectByUpload(file).subscribe({
      next: (project: any) => {
        this.loadingService.stopLoading();
        this.data.openedProjects.next([project]);
        this.data.selectedProject.next(project);
        this.router.navigateByUrl(`/editor/${project.id}`);
      },
      error: (err) => {
        this.loadingService.stopLoading();
        console.log(err);
      },
    });
  }
}
