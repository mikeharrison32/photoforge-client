import { Object } from 'fabric/fabric-impl';
import { ILayer } from './ILayer';
import { Layer } from './layer';
export class ShapeLayer implements ILayer {
  get_title(): string {
    throw new Error('Method not implemented.');
  }
  get_object(): Object {
    throw new Error('Method not implemented.');
  }
}
