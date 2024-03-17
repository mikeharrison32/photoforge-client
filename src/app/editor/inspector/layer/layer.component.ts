import {
  Component,
  ViewChild,
  ElementRef,
  HostListener,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Layer } from 'src/app/core/layers/layer';
import { PixelLayer } from 'src/app/core/layers/pixel-layer';
import { TypeLayer } from 'src/app/core/layers/type-layer';

import { DataService } from 'src/app/core/services/data.service';
import { LayerService } from 'src/app/core/services/layer.service';
import { LayerType } from 'src/app/types/layer';
@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss'],
})
export class LayerComponent implements OnInit, OnDestroy {
  @ViewChild('layersContextMenu')
  layersContextMenu?: ElementRef;
  contextMenuActive: boolean = false;
  @Input() selected: boolean | undefined = false;
  imgSrc?: string;
  @Input() layer?: Layer;
  maskSelected: boolean = false;
  title?: string;
  @Output() onLockClick = new EventEmitter<boolean>();
  @Output() onHideClick = new EventEmitter<boolean>();
  maskContextMenuActive: boolean = false;
  get LayerType() {
    return LayerType;
  }
  constructor(private data: DataService, private layerService: LayerService) {}
  ngOnInit(): void {
    if (this.layer instanceof PixelLayer) {
      this.imgSrc = this.layer.src;
    } else if (this.layer instanceof TypeLayer) {
      this.imgSrc = 'assets/tools-icons/text-tool.svg';
    }
    this.data.selectedLayers.subscribe((layers) => {
      this.selected = layers.includes(this.layer!);
      if (this.selected) {
        // this.layer!.canvas!.style.border = 'solid rgb(0, 192, 255) ';
      } else {
        // this.layer!.canvas!.style.border = 'none';
      }
      // this.data.selectedAjLayers.next([]);
    });
  }
  ngOnDestroy(): void {
    // this.data.selectedLayers.unsubscribe();
    // this.data.selectedAjLayers.unsubscribe();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(e: MouseEvent) {
    if (!this.contextMenuActive) return;
    if (!this.layersContextMenu?.nativeElement.contains(e.target)) {
      this.contextMenuActive = false;
    }
  }
  onLayerClick(e: any) {
    if (e.ctrlKey) {
      this.data.selectedLayers.next([
        ...this.data.selectedLayers.getValue(),
        this.layer!,
      ]);
    } else {
      this.data.selectedAjLayers.next([]);
      this.data.selectedLayers.next([this.layer!]);
    }
  }
  toggleLayerLocked() {
    if (this.layer?.locked) {
      this.layer?.unlock();
    } else {
      this.layer?.lock();
    }
    // this.onLockClick.emit(true);
  }
  toggleLayerHidden() {
    if (this.layer?.visible) {
      this.layer?.hide();
    } else {
      this.layer?.show();
    }
  }
  onLayerRightClick(e: MouseEvent) {
    e.preventDefault();
    this.contextMenuActive = true;
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
    // this.contextMenuActive = false;
  }
  duplicateLayer() {
    // this.layerService.duplicateLayer(this.layer!);
  }
  layerMaskContextMenu(e: any) {
    console.log('bo');
    e.preventDefault();
    this.contextMenuActive = false;
  }
  pastLayerStyle() {}
  copyLayerStyle() {}
  deleteLayer() {
    this.data.selectedLayers.value.forEach((sl) => {
      // this.layerService.deleteLayer(sl.Id);
    });
  }
  getInstanceOf(layer?: Layer) {
    if (layer instanceof PixelLayer) {
      return 'pixel';
    } else if (false) {
      return 'shape';
    }
    return '';
  }
  copySvg() {}
  copyCSS() {}
  toggleMaskContextMenu() {
    this.maskContextMenuActive = this.maskContextMenuActive ? false : true;
  }
}
