import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../core/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: 'notification.component.html',
  styleUrls: ['notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  constructor(private notification: NotificationService) {}
  title: string = '';
  isVisible: boolean = false;
  ngOnInit() {
    this.notification.title.subscribe((title) => {
      this.title = title;
    });
    this.notification.isVisible.subscribe((value) => {
      this.isVisible = value;
    });
  }
}
