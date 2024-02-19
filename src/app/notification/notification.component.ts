import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  INotificationOptions,
  NotificationService,
} from '../core/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: 'notification.component.html',
  styleUrls: ['notification.component.scss'],
})
export class NotificationComponent implements AfterViewInit {
  options?: INotificationOptions;
  constructor(private notification: NotificationService) {}
  title: string = '';
  isVisible: boolean = false;
  @ViewChild('notification') notificationElem?: ElementRef;
  ngAfterViewInit() {
    this.notification.options.subscribe((options) => {
      this.options = options;
      this.title = options.title;
      this.isVisible = options.isVisible || false;
      if (options.mainTextColor) {
        console.log(this.notificationElem);
        this.notificationElem!.nativeElement.style.color =
          options.mainTextColor;
      }
    });
  }
  onRemoveIconClick(e: any) {
    this.isVisible = false;
  }
  onOkBtnClick(e: any) {}
}
