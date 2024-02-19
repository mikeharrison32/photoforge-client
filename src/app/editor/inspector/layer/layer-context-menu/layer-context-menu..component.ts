import {
  Component,
  ViewChild,
  ElementRef,
  HostListener,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { Layer } from 'src/app/core/layers/layer';

import { DataService } from 'src/app/core/services/data.service';
import { LayerService } from 'src/app/core/services/layer.service';
@Component({
  selector: 'app-layer-context-menu',
  templateUrl: './layer-context-menu.component.html',
  styleUrls: ['./layer-context-menu.component.scss'],
})
export class LayerContextMenuComponent implements OnInit {
  @ViewChild('layersContextMenu')
  layersContextMenu?: ElementRef;
  @Input() Active: boolean = false;
  @Input() layer?: Layer;
  constructor(private data: DataService, private layerService: LayerService) {}
  ngOnInit(): void {}

  @HostListener('document:click', ['$event'])
  handleClickOutside(e: MouseEvent) {
    if (!this.Active) return;
    if (!this.layersContextMenu?.nativeElement.contains(e.target)) {
      this.Active = false;
    }
  }
  groupFromLayer() {
    // const layer = this.data.layers.value.find((l) => l.Id == this.layer?.Id!);
    // if (layer && layer.GroupId != null) {
    //   return;
    // }
    // let groupId = `rer${Math.random()}fea`;
    // this.data.groups.value.push({
    //   Id: groupId,
    //   Title: `Group ${this.data.groups.value.length + 1}`,
    // });
    // layer!.GroupId = groupId;
    // this.Active = false;
  }
  duplicateLayer() {
    // this.layerService.duplicateLayer(this.layer!);
  }

  pastLayerStyle() {}
  copyLayerStyle() {}
  deleteLayer() {
    this.data.selectedLayers.value.forEach((sl) => {
      // this.layerService.deleteLayer(sl.Id);
    });
  }
  copySvg() {}
  copyCSS() {}
}
