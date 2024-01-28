import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-tool',
  template: `
    <div
      [ngClass]="Active ? 'active-tool' : 'tool'"
      (click)="toggleToolChoices()"
    >
      <img class="tool-icon" [src]="ImgSrc" />
      <div class="tool-choices" *ngIf="hasChoices && toolChoicesActive">
        <ng-content select="[tool-choices]"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./tool.component.scss'],
})
export class ToolComponent {
  @Input() ImgSrc?: string;
  @Input() Active?: boolean;
  @Input() hasChoices: boolean = false;
  toolChoicesActive: boolean = false;
  toggleToolChoices() {
    this.toolChoicesActive = this.toolChoicesActive ? false : true;
  }
}
