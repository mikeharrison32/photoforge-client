import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CropToolService {
  configured = new BehaviorSubject<boolean>(false);

  constructor() {}

  configure() {
    this.configured.next(true);
  }
  disconfigure() {
    console.log('disconfigureing crop tool');
    this.configured.next(false);
  }
}
