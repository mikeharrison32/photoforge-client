import { Component, Input } from '@angular/core';
import { Layer } from 'src/app/core/layers/layer';

@Component({
  selector: 'app-shape-layer-property',
  templateUrl: './shape-layer-property.component.html',
  styleUrls: ['./shape-layer-property.component.scss'],
})
export class ShapeLayerPropertyComponent {
  @Input() selectedLayer?: Layer;
}
