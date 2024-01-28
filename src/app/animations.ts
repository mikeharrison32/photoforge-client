import { animate, style, transition, trigger } from '@angular/animations';

export const newDocAnimation = trigger('newDocAnim', [
  transition(':enter', [
    style({ scale: 0 }),
    animate('200ms', style({ scale: 1 })),
    animate('50ms', style({ scale: 1.2 })),
    animate('50ms', style({ scale: 1 })),
  ]),
  transition(':leave', [animate('200ms', style({ scale: 0 }))]),
]);
