import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor() {}
  // title = new BehaviorSubject<string>('');
  // isVisible = new BehaviorSubject<boolean>(false);
  options = new BehaviorSubject<INotificationOptions>({ title: '' });

  createNotification(options: INotificationOptions) {
    this.options.next({ ...options, isVisible: true });
    if (options?.quitAfter) {
      setTimeout(() => {
        this.hideNotification();
      }, options.quitAfter);
    }
  }
  hideNotification() {
    this.options.next({ title: '', isVisible: false });
  }
}

export interface INotificationOptions {
  title: string;
  isVisible?: boolean;
  quitAfter?: number;
  icon?: string;
  mainTextColor?: string;
  details?: string;
  hasOkBtn?: boolean;
  hasCancelBtn?: boolean;
}
