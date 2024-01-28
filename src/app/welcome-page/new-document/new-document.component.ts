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
import { templates } from './mock_data/templates';
import { TemplateType } from './enums/templateType.enum';
import { ProjectPreset } from 'src/app/types/project';
import { DataService } from 'src/app/core/services/data.service';
import { Router } from '@angular/router';
import { newDocAnimation } from 'src/app/animations';

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
  constructor(private data: DataService, private router: Router) {}
  recentTemplates: Template[] = templates.filter(
    (t) => t.type == TemplateType.Recent
  );
  savedTemplates: Template[] = templates.filter(
    (t) => t.type == TemplateType.Saved
  );
  photoTemplates: Template[] = templates.filter(
    (t) => t.type == TemplateType.Photo
  );
  printTemplates: Template[] = templates.filter(
    (t) => t.type == TemplateType.Print
  );
  artAndIllustrationTemplates: Template[] = templates.filter(
    (t) => t.type == TemplateType.ArtAndIllustration
  );
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
  onCloseBtnClick(isClicked: boolean) {
    this.closeBtnClicked.emit(true);
  }
  onCreateBtnClick(presets: ProjectPreset) {
    const newProject = {
      Id: `${Math.random()}`,
      UserId: '42ds',
      ...presets,
    };
    this.data.projects.value.push(newProject);
    this.data.canvas.value?.setWidth(newProject.Width);
    this.data.canvas.value?.setHeight(newProject.Height);
    this.data.selectedProject.next(newProject);
    this.router.navigateByUrl('/editor');
    this.createBtnClicked.emit(true);
  }

  ngOnInit() {
    this.activeTemplate = this.recentTemplates[0];
  }
}
