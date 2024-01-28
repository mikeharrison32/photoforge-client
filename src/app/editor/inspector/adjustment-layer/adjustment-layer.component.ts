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
import { AdjustmentLayer } from 'src/app/core/layers/adjustment/adjustment_layer';
import { LayerService } from 'src/app/core/services/layer.service';
import { ColorRGBA } from 'src/app/enums/color';

@Component({
  selector: 'app-adjustment-layer',
  templateUrl: './adjustment-layer.component.html',
  styleUrls: ['./adjustment-layer.component.scss'],
})
export class AdjustmentLayerComponent implements OnInit {
  @ViewChild('layersContextMenu')
  layersContextMenu?: ElementRef;
  contextMenuActive: boolean = false;
  @Input() selected: boolean | undefined = false;
  @Input() adjustment?: AdjustmentLayer;
  maskSelected: boolean = false;
  hasMask?: boolean = true;
  @Input() type?: string;
  @Output() onHideClick = new EventEmitter<boolean>();
  ngOnInit(): void {}
  @HostListener('document:click', ['$event'])
  handleClickOutside(e: MouseEvent) {
    if (!this.contextMenuActive) return;
    if (!this.layersContextMenu?.nativeElement.contains(e.target)) {
      this.contextMenuActive = false;
    }
  }
  toggleLayerHidden() {
    // if (this.adjustment?.Hidden) {
    //   this.layer.unHideAdjustment(this.adjustment);
    // } else {
    //   this.layer.hideAdjustment(this.adjustment!);
    // }
  }
  onLayerRightClick(e: MouseEvent) {
    e.preventDefault();
    this.contextMenuActive = true;
  }
  setSelectedAdjustmentLayer(e: any) {
    // if (e.ctrlKey) {
    //   this.layer.addAdjustmentLayerToSelection(
    //     this.adjustment?.Id!,
    //     this.adjustment?.LayerId!
    //   );
    // } else {
    //   this.layer.setSelectedAdjustmentLayer(
    //     this.adjustment?.Id!,
    //     this.adjustment?.LayerId!
    //   );
    // }
  }
}
