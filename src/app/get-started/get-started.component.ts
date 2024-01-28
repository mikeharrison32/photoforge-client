import { AfterViewInit, Component } from '@angular/core';
import { NotificationService } from '../core/services/notification.service';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent implements AfterViewInit{
  constructor(private notification: NotificationService){}
  ngAfterViewInit(): void {
    this.notification.createNotification("Welcome to photoforge", 3000)
  }
}
