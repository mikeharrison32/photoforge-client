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
export class LayerComponent implements OnInit {
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
  @ViewChild('thumbnail') thumbnail?: ElementRef;
  type = this.layer?.type;
  constructor(private data: DataService, private layerService: LayerService) {}
  ngOnInit(): void {
    if (this.layer instanceof PixelLayer) {
    } else if (this.layer instanceof TypeLayer) {
      this.imgSrc = 'assets/tools-icons/text-tool.svg';
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(e: MouseEvent) {
    if (!this.contextMenuActive) return;
    if (!this.layersContextMenu?.nativeElement.contains(e.target)) {
      this.contextMenuActive = false;
    }
  }
  onLayerClick(e: any) {
    console.log(this.selected);
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

  copySvg() {}
  copyCSS() {}
}
