import { Component, ElementRef, Input, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-template',
  styleUrls: ['./template.component.scss'],
  template: `
    <div [ngClass]="Active ? 'active-template' : 'template'">
      <img class="template-icon" src="assets/default-template-icon.svg" />
      <p class="template-title">{{ Title }}</p>
      <p class="template-description">
        {{ templatePresets }}
      </p>
    </div>
  `,
})
export class TemplateComponent implements OnInit {
  @Input() Title!: string;
  @Input() Width!: number;
  @Input() Height!: number;
  @Input() Resolution!: number;
  @Input() Active!: boolean;
  templatePresets: string = '';
  ngOnInit() {
    this.templatePresets = `${this.Width} x ${this.Height} px @ ${this.Resolution} ppi`;
  }
}
