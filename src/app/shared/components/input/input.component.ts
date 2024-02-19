import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements AfterViewInit, OnDestroy {
  @Input() unit?: string;
  @Input() Disabled: boolean = false;
  @Input() hasVolume: boolean = false;
  @Input() Value?: number = 0;
  @Input() Max: number = 10000;
  @Input() Min: number = -10000;

  @ViewChild('input') input?: ElementRef;
  @Input() Floor: boolean = true;
  @Output() onInputChange = new EventEmitter<number>();
  mousedown: boolean = false;
  editMode: boolean = false;
  mouseUpFunc = (): void => {};
  mouseMoveFunc = (): void => {};
  interval: any;
  volumeActive: boolean = false;
  constructor(private render: Renderer2) {}
  onInput(value: any) {
    this.onInputChange.emit(value);
  }
  @HostListener('document:click', ['$event'])
  stopEditMode(e: any) {}
  onValueClick(e: any) {
    this.mousedown = true;
    this.editMode = true;
    const listener = this.render.listen('document', 'click', (e) => {
      if (
        !this.input?.nativeElement.contains(e.target) &&
        this.input?.nativeElement != e.target
      ) {
        console.log(this.input?.nativeElement, e.target);
        // this.editMode = false;
        listener();
      }
    });
  }
  onEditModeInputChange(e: any) {
    if (e.target.value > this.Max || e.target.value < this.Min) {
      e.target.value = this.Value;
      return;
    }
    this.Value! = e.target.value;
  }
  ngAfterViewInit() {
    this.mouseMoveFunc = this.render.listen('document', 'mousemove', (e) => {
      if (this.mousedown == false) {
        return;
      }
      document.body.style.cursor = 'move';
      let rect = this.input?.nativeElement.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let prevX = x;
      let movingRight = x > prevX;
      if (movingRight && this.Value! < this.Max && this.Value! > this.Min) {
        this.Value! += 3;
      } else if (this.Value! < this.Max && this.Value! > this.Min) {
        this.Value! -= 3;
      }
      this.onInputChange.emit(this.Value);
    });
    this.mouseUpFunc = this.render.listen('document', 'mouseup', (e) => {
      clearInterval(this.interval);
      this.mousedown = false;
      document.body.style.cursor = 'default';
    });
  }
  toggleVolume() {
    this.volumeActive = this.volumeActive ? false : true;
  }
  ngOnDestroy(): void {
    this.mouseMoveFunc();
    this.mouseUpFunc();
  }
}
