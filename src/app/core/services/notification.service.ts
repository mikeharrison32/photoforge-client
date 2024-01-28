import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor() {}
  title = new BehaviorSubject<string>('');
  isVisible = new BehaviorSubject<boolean>(false);
  createNotification(title: string, quitAfter?: number) {
    this.isVisible.next(true);
    this.title.next(title);
    if (quitAfter) {
      setTimeout(() => {
        this.hideNotification();
      }, quitAfter);
    }
  }
  hideNotification() {
    this.isVisible.next(false);
  }
}
