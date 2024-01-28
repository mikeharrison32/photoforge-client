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
  selector: '[appDestroyable]',
})
export class DestroyableDirective {
  constructor(private elementRef: ElementRef, private render: Renderer2) {}
  @Input() set appDestroyable(destory: boolean) {}
}
