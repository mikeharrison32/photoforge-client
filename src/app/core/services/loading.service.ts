import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor() {}
  options = new BehaviorSubject<ILoadingOptions>({ isLoading: false });

  startLoading(message?: string) {
    this.options.next({ message, isLoading: true });
  }
  stopLoading() {
    this.options.next({ isLoading: false });
  }
}

interface ILoadingOptions {
  message?: string;
  isLoading: boolean;
}
