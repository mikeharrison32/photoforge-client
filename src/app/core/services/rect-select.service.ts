import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RectSelectService {
  constructor() {}
  configure() {
    console.log('rect select configured');
  }
}
