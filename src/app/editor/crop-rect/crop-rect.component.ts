import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Renderer } from 'pixi.js';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-crop-rect',
  templateUrl: './crop-rect.component.html',
  styleUrls: ['./crop-rect.component.scss'],
})
export class CropRectComponent implements AfterViewInit {
  @ViewChild('tlCorner') tlCorner?: ElementRef;
  @ViewChild('trCorner') trCorner?: ElementRef;
  @ViewChild('blCorner') blCorner?: ElementRef;
  @ViewChild('brCorner') brCorner?: ElementRef;

  @ViewChild('mbCorner') mbCorner?: ElementRef;
  @ViewChild('mtCorner') mtCorner?: ElementRef;
  @ViewChild('mlCorner') mlCorner?: ElementRef;
  @ViewChild('mrCorner') mrCorner?: ElementRef;

  @ViewChild('cropRect') cropRect?: ElementRef;
  @ViewChild('cropBox') cropBox?: ElementRef;

  @Input() display?: HTMLElement;
  constructor(private renderer: Renderer2, private data: DataService) {}
  ngAfterViewInit(): void {
    this.initCropTool();
  }
  private initCropTool() {
    const tlCornerElem = this.tlCorner?.nativeElement as HTMLElement;
    const trCornerElem = this.trCorner?.nativeElement as HTMLElement;
    const brCornerElem = this.brCorner?.nativeElement as HTMLElement;
    const blCornerElem = this.blCorner?.nativeElement as HTMLElement;

    const mbCornerElem = this.mbCorner?.nativeElement as HTMLElement;
    const mtCornerElem = this.mtCorner?.nativeElement as HTMLElement;
    const mlCornerElem = this.mlCorner?.nativeElement as HTMLElement;
    const mrCornerElem = this.mrCorner?.nativeElement as HTMLElement;

    const cropRect = this.cropRect?.nativeElement as HTMLElement;
    const cropBoxElem = this.cropBox?.nativeElement as HTMLElement;

    let mousedown = false;
    let selectedCorner = '';
    this.renderer.listen(tlCornerElem, 'mousedown', (e) => {
      this.resetCornerPositions();
      mousedown = true;
      selectedCorner = 'tl';
    });
    this.renderer.listen(trCornerElem, 'mousedown', (e) => {
      this.resetCornerPositions();
      mousedown = true;
      selectedCorner = 'tr';
    });
    this.renderer.listen(blCornerElem, 'mousedown', (e) => {
      this.resetCornerPositions();
      mousedown = true;
      selectedCorner = 'bl';
    });
    this.renderer.listen(brCornerElem, 'mousedown', (e) => {
      this.resetCornerPositions();
      mousedown = true;
      selectedCorner = 'br';
    });

    this.renderer.listen(mtCornerElem, 'mousedown', (e) => {
      this.resetCornerPositions();
      mousedown = true;
      selectedCorner = 'mt';
    });
    this.renderer.listen(mbCornerElem, 'mousedown', (e) => {
      this.resetCornerPositions();
      mousedown = true;
      selectedCorner = 'mb';
    });
    this.renderer.listen(mrCornerElem, 'mousedown', (e) => {
      this.resetCornerPositions();
      mousedown = true;
      selectedCorner = 'mr';
    });
    this.renderer.listen(mlCornerElem, 'mousedown', (e) => {
      this.resetCornerPositions();
      mousedown = true;
      selectedCorner = 'ml';
    });

    let cropBoxLeft: number = 0;
    let cropBoxTop: number = 0;
    let cropBoxBottom: number = 0;
    let cropBoxRight: number = 0;
    this.renderer.listen(document, 'mousemove', (e) => {
      const x = cropBoxElem.getBoundingClientRect().left;
      const y = cropBoxElem.getBoundingClientRect().top;
      const cropClientRect = cropRect.getBoundingClientRect();
      if (!mousedown) {
        return;
      }
      switch (selectedCorner) {
        case 'tl':
          tlCornerElem.style.left = e.clientX - x - 5 + 'px';
          tlCornerElem.style.top = e.clientY - y - 5 + 'px';
          cropBoxLeft = e.clientX - cropClientRect.left;
          cropBoxTop = e.clientY - cropClientRect.top;

          cropRect.style.borderWidth = `${cropBoxTop}px ${cropBoxRight}px ${cropBoxBottom}px ${cropBoxLeft}px`;
          break;
        case 'tr':
          trCornerElem.style.left = e.clientX - x - 29 + 'px';
          trCornerElem.style.top = e.clientY - y - 5 + 'px';
          cropBoxTop = e.clientY - cropClientRect.top;
          cropBoxRight = cropClientRect.right - e.clientX;
          cropRect.style.borderWidth = `${cropBoxTop}px ${cropBoxRight}px ${cropBoxBottom}px ${cropBoxLeft}px`;
          break;
        case 'bl':
          blCornerElem.style.left = e.clientX - x - 5 + 'px';
          blCornerElem.style.top = e.clientY - y - 5 + 'px';
          cropBoxBottom = cropClientRect.bottom - e.clientY;
          cropBoxLeft = e.clientX - cropClientRect.left;
          cropRect.style.borderWidth = `${cropBoxTop}px ${cropBoxRight}px ${cropBoxBottom}px ${cropBoxLeft}px`;

          break;
        case 'br':
          cropBoxBottom = cropClientRect.bottom - e.clientY;
          cropBoxRight = cropClientRect.right - e.clientX;
          brCornerElem.style.left = e.clientX - x - 29 + 'px';
          brCornerElem.style.top = e.clientY - y + 'px';

          cropRect.style.borderWidth = `${cropBoxTop}px ${cropBoxRight}px ${cropBoxBottom}px ${cropBoxLeft}px`;
          break;
        case 'mt':
          cropBoxTop = e.clientY - cropClientRect.top;
          mtCornerElem.style.top = e.clientY - y + 'px';
          cropRect.style.borderWidth = `${cropBoxTop}px ${cropBoxRight}px ${cropBoxBottom}px ${cropBoxLeft}px`;
          break;

        case 'mb':
          cropBoxBottom = cropClientRect.bottom - e.clientY;
          mbCornerElem.style.top = e.clientY - y + 'px';
          cropRect.style.borderWidth = `${cropBoxTop}px ${cropBoxRight}px ${cropBoxBottom}px ${cropBoxLeft}px`;
          break;

        case 'ml':
          cropBoxLeft = e.clientX - cropClientRect.left;
          // mlCornerElem.style.top = e.clientY - y + 'px';
          cropRect.style.borderWidth = `${cropBoxTop}px ${cropBoxRight}px ${cropBoxBottom}px ${cropBoxLeft}px`;
          break;

        case 'mr':
          cropBoxRight = cropClientRect.right - e.clientX;
          // mrCornerElem.style.top = e.clientY - y + 'px';
          cropRect.style.borderWidth = `${cropBoxTop}px ${cropBoxRight}px ${cropBoxBottom}px ${cropBoxLeft}px`;
          break;
      }
    });

    this.renderer.listen(document, 'mouseup', (e) => {
      mousedown = false;
    });

    this.renderer.listen(document, 'keydown', (e) => {
      if (e.code == 'Enter') {
        const zoom = this.data.zoom.getValue() / 100;
        console.log({
          left: cropBoxLeft,
          top: cropBoxTop,
          right: cropBoxRight,
          bottom: cropBoxBottom,
        });
        if (this.display) {
          const cropBoxElem = this.cropBox?.nativeElement;
          this.display.style.width = cropBoxElem.clientWidth / zoom + 'px';
          this.display.style.height = cropBoxElem.clientHeight / zoom + 'px';
          const selectedProject = this.data.selectedProject.getValue();

          const layers = this.data.layers
            .getValue()
            .filter((layer) => layer.projectId == selectedProject?.Id);
          // layer.elem.style.right = cropBoxRight + 'px';
          layers.forEach((layer) => {
            layer.elem.style.left = -cropBoxLeft / zoom + 'px';
            layer.elem.style.top = -cropBoxTop / zoom + 'px';
          });

          this.data.selectedTool.next('moveTool');
        }
      }
    });
  }

  private resetCornerPositions() {
    this.trCorner!.nativeElement.style.left = 'calc(100% - 29px)';
    this.brCorner!.nativeElement.style.left = 'calc(100% - 29px)';
    this.brCorner!.nativeElement.style.top = '100%';
    this.blCorner!.nativeElement.style.top = '100%';
    this.mlCorner!.nativeElement.style.top = '50%';
    this.mrCorner!.nativeElement.style.top = '50%';
    this.mbCorner!.nativeElement.style.left = '50%';
    this.mbCorner!.nativeElement.style.top = '100%';
    this.mtCorner!.nativeElement.style.left = '50%';
  }
}
