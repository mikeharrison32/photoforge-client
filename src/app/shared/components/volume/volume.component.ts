import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.scss'],
})
export class VolumeComponent implements AfterViewInit {
  @Input() text?: string;
  @Input() Image?: string;
  @Input() maxValue: number = 100;
  @Input() minValue: number = -100;
  @Input() Value?: number;
  @Input() Disabled: boolean = false;
  @Input() ZeroBased: boolean = false;
  @Input() rightText?: string;
  @Output() volumeChange = new EventEmitter<number>();
  @ViewChild('volumeCursor') volumeCursor?: ElementRef;
  @ViewChild('line') line?: ElementRef;
  mousedown: boolean = false;
  volumeValue: number | null = 0;
  constructor(private render: Renderer2) {}

  onVolumeChange() {
    this.volumeChange.emit(this.volumeValue!);
  }
  onVolumeCursorMouseDown(e: any) {
    this.mousedown = true;
  }
  ngAfterViewInit() {
    if (this.Disabled) {
      this.volumeValue = null;
    }
    this.volumeCursor!.nativeElement.style.transform = `translate(${
      this.maxValue / 2
    }px)`;
    this.volumeValue = this.Value || 0;

    this.render.listen('document', 'mouseup', (e) => {
      this.mousedown = false;
    });
    this.render.listen('document', 'mousemove', (e) => {
      if (this.mousedown == false) {
        return;
      }
      let rect = this.line?.nativeElement.getBoundingClientRect();
      let x = e.clientX - rect.left;
      if (!(x < 0) && !(x > rect.width - 1)) {
        console.log(Math.floor(x));
        this.volumeCursor!.nativeElement.style.transform = `translate(${x}px)`;
        let mid = this.maxValue / 2;
        let min = -80;
        let max = 101;
        let xMid = x - mid;
        this.volumeValue = this.scaleNumber(xMid, min, max);
        this.onVolumeChange();
      }
    });
  }
  onInputChange(value: number) {
    this.volumeChange.emit(value);
  }
  scaleNumber(n: number, min: number, max: number) {
    let range = max - min;
    let scale = (n - min) / range;
    return scale * 2 - 1;
  }
}
