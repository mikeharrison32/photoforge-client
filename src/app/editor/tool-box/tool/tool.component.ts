import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
@Component({
  selector: 'app-tool',
  template: `
    <div
      [ngClass]="Active ? 'active-tool' : 'tool'"
      (click)="toggleToolChoices()"
    >
      <img width="30" class="tool-icon" [src]="ImgSrc" />
      <div class="tool-choices" *ngIf="hasChoices && toolChoicesActive">
        <ng-content select="[tool-choices]"></ng-content>
      </div>
      <div class="desc" *ngIf="Desc">
        <div class="small-triangle"></div>
        <p>{{ Desc }}</p>
        <kbd *ngIf="Shortcut">{{ Shortcut }}</kbd>
      </div>
    </div>
  `,
  styleUrls: ['./tool.component.scss'],
})
export class ToolComponent {
  @Input() ImgSrc?: string;
  @Input() Active?: boolean;
  @Input() Desc?: string;
  @Input() Shortcut?: string;
  @Input() hasChoices: boolean = false;
  toolChoicesActive: boolean = false;
  toggleToolChoices() {
    this.toolChoicesActive = this.toolChoicesActive ? false : true;
  }
}
