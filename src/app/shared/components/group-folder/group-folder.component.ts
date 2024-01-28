import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-group-folder',
  templateUrl: './group-folder.component.html',
  styleUrls: ['./group-folder.component.scss'],
})
export class GroupFolderComponent {
  @Input() title?: string;
  folderOpen: boolean = true;

  toggleFolderOpen() {
    this.folderOpen = this.folderOpen ? false : true;
  }
}
