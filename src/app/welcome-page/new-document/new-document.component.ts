import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Template } from './types/template.type';
import { TemplateType } from './enums/templateType.enum';
import { ProjectPreset } from 'src/app/types/project';
import { DataService } from 'src/app/core/services/data.service';
import { Router } from '@angular/router';
import { newDocAnimation } from 'src/app/animations';
import { ApiService } from 'src/app/core/services/api.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { templates } from './mock_data/templates';

@Component({
  selector: 'app-new-document',
  templateUrl: './new-document.component.html',
  styleUrls: ['./new-document.component.scss'],
  animations: [newDocAnimation],
})
export class NewDocumentComponent implements OnInit {
  selectedTemplateType: string = 'Recent';
  @Output() closeBtnClicked = new EventEmitter<boolean>();
  @Output() createBtnClicked = new EventEmitter<boolean>();
  templates: any[] = [];
  loadingTemplates: boolean = false;
  constructor(
    private data: DataService,
    private router: Router,
    private api: ApiService,
    private loadingService: LoadingService,
    private notificationService: NotificationService
  ) {}
  recentTemplates: Template[] = templates;
  savedTemplates: Template[] = [];
  photoTemplates: Template[] = [];
  printTemplates: Template[] = [];
  artAndIllustrationTemplates: Template[] = [];
  webTemplates: Template[] = [];
  mobileTemplates: Template[] = [];
  filmAndVideoTemplates: Template[] = [];
  activeTemplate!: Template;
  @HostBinding('@newDocAnim')
  setSelectedTemplateType(tm: string) {
    this.selectedTemplateType = tm;
  }
  setActiveTemplate(id: number) {
    let template: Template | undefined = this.recentTemplates.find(
      (t) => t.id == id
    );
    this.activeTemplate =
      template == undefined
        ? {
            id: 0,
            title: '',
            type: TemplateType.Recent,
            width: 0,
            height: 0,
            resolution: 0,
          }
        : template;
  }
  onCloseBtnClick(e: any) {
    this.data.newMenuClick.next(false);
  }
  onCreateBtnClick(presets: ProjectPreset) {
    this.loadingService.startLoading('Creating project...');
    const newProject = {
      name: presets.Title,
      width: presets.Width,
      height: presets.Height,
    };

    this.api
      .createBlankProject(newProject)
      .then((project) => {
        this.data.openedProjects.next(project);
        this.data.selectedProject.next(project);
        this.router.navigateByUrl(`/editor/${project.id}`);
        this.loadingService.stopLoading();
      })
      .catch((err) => {
        this.loadingService.stopLoading();
        this.notificationService.createNotification({
          title: "Couldn't create layer.",
          details: 'The server might be down.',
          // quitAfter: 5000,
        });
        console.log(err);
      });
  }

  ngOnInit() {
    this.templates = templates;
    this.activeTemplate = this.recentTemplates[0];
    // this.loadingTemplates = true;
    // this.api
    //   .getTemplates()
    //   .then((templates: any) => {
    //     this.templates = templates;
    //     this.loadingTemplates = false;
    //   })
    //   .catch((err) => {
    //     this.loadingTemplates = false;
    //     console.log(err);
    //   });
  }
}
