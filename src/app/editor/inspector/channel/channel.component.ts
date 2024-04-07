import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { LayerComponent } from '../layer/layer.component';
import { PixelLayer } from 'src/app/core/layers/pixel-layer';
import { Layer } from 'src/app/core/layers/layer';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent implements AfterViewInit {
  @Input() name?: string;
  @Input() layer?: any;
  pixelLayer?: PixelLayer;
  visible: boolean = true;
  @Output() onVisibleChange = new EventEmitter<boolean>();
  ngAfterViewInit(): void {
    if (this.layer instanceof PixelLayer) {
      this.pixelLayer = this.layer;
    }
  }
  toggleVisible() {
    this.visible = this.visible ? false : true;
    this.onVisibleChange.emit(this.visible);
  }
}
