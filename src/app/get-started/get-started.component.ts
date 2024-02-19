import { AfterViewInit, Component } from '@angular/core';
import { NotificationService } from '../core/services/notification.service';
import { DataService } from '../core/services/data.service';
import { removeToBottom, removeToTop } from '../animations';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss'],
  animations: [removeToBottom, removeToTop],
})
export class GetStartedComponent implements AfterViewInit {
  constructor(
    private notification: NotificationService,
    private data: DataService
  ) {}
  ngAfterViewInit(): void {
    this.data.showNav.next(true);
  }
}
