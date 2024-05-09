import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
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
  constructor(private renderer: Renderer2) {}
  ngAfterViewInit(): void {
    const rect = this.handle?.nativeElement.getBoundingClientRect() as DOMRect;
    console.log(this.handle?.nativeElement);
    let mousedown = false;
    this.renderer.listen(this.handle?.nativeElement, 'mousedown', (e) => {
      mousedown = true;
      console.log('mousedown');
    });
    this.renderer.listen(document, 'mouseup', (e) => {
      mousedown = false;
    });

    this.renderer.listen(document, 'mousemove', (e) => {
      if (!mousedown) {
        return;
      }

      const x = e.clientX;
      console.log(rect);
      console.log(x);
      if (x < 1) {
        return;
      }

      this.handle!.nativeElement.style.left = `${x}px`;

      this.onHandleChange.emit(x);
    });
  }
}
