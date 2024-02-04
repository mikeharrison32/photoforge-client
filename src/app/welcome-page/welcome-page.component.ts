import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../core/services/token.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from '../core/services/api.service';
import { Project } from '../types/project';
import { DataService } from '../core/services/data.service';
import { StateService } from '../core/services/state.service';

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
    private stateService: StateService
  ) {}
  ngOnInit() {
    this.data.showNav.next(false);
  }
  setActiveElement(el: string) {
    this.selectedTab = el;
    this.activeTab = el;
  }
  onCloseBtnClick(e: any) {
    this.createNewBtnClicked = false;
  }
  displayNewDocument() {
    this.createNewBtnClicked = true;
  }
  onOpenFileBtnChange(e: any) {
    for (let file of e.target.files) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const imgObj = new Image();
        imgObj.src = event.target.result;
        imgObj.onload = () => {
          const project: Project = {
            Id: `${Math.random()}`,
            Title: file.name,
            UserId: 'dasd',
            Width: imgObj.width,
            Height: imgObj.height,
          };

          this.data.projects.next([...this.data.projects.getValue(), project]);
          this.data.canvas.value?.setWidth(project.Width!);
          this.data.canvas.value?.setHeight(project.Height!);
          this.data.selectedProject.next(project);
        };
      };
      this.api.createProjectByUpload(file).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/editor');
        },
        error: (err) => {
          console.log(err);
        },
      });
      reader.readAsDataURL(file);
    }
  }
}
