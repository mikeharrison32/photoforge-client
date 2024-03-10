import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements AfterViewInit {
  @Input() menuName?: string;
  @ViewChild('menu') menu?: ElementRef;
  open: boolean = false;
  ngAfterViewInit(): void {
    document.addEventListener('click', (e) => {
      if (!this.menu?.nativeElement.contains(e.target)) {
        this.open = false;
      }
    });
  }
}
