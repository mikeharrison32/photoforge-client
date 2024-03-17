import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appInfo]',
})
export class InfoDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  @Input() set appInfo(text: string) {
    const infoElem = this.renderer.createElement('div');
    infoElem.classList.add('info');
    const textElem = this.renderer.createElement('p');
    textElem.textContent = text;
    infoElem.appendChild(textElem);
    this.elementRef.nativeElement.appendChild(infoElem);
    (this.elementRef.nativeElement as HTMLElement).addEventListener(
      'mouseover',
      (e) => {
        infoElem.style.display = 'block';
      }
    );
    (this.elementRef.nativeElement as HTMLElement).addEventListener(
      'mouseout',
      (e) => {
        infoElem.style.display = 'none';
      }
    );
  }
}
