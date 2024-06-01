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
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent implements AfterViewInit {
  @ViewChild('handle') handle?: ElementRef;
  @ViewChild('track') track?: ElementRef;
  @Output() onHandleChange = new EventEmitter<number>();
  @Input() value?: number;
  constructor(private renderer: Renderer2) {}
  ngAfterViewInit(): void {
    const rect = this.handle?.nativeElement.getBoundingClientRect() as DOMRect;
    this.handle!.nativeElement.style.left = `${this.value}px`;

    let mousedown = false;
    this.renderer.listen(this.handle?.nativeElement, 'mousedown', (e) => {
      mousedown = true;
    });
    this.renderer.listen(document, 'mouseup', (e) => {
      mousedown = false;
    });

    this.renderer.listen(document, 'mousemove', (e) => {
      if (!mousedown) {
        return;
      }

      const width = this.track!.nativeElement.clientWidth;
      const x = e.clientX - rect.left;
      if (x < 1 || x > width) {
        return;
      }

      this.handle!.nativeElement.style.left = `${x}px`;

      this.onHandleChange.emit(x);
    });
  }
}
