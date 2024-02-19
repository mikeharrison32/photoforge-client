import {
  animate,
  keyframes,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const newDocAnimation = trigger('newDocAnim', [
  transition(':enter', [
    style({ scale: 0 }),
    animate('200ms', style({ scale: 1 })),
    animate('50ms', style({ scale: 1.2 })),
    animate('50ms', style({ scale: 1 })),
  ]),
  transition(':leave', [animate('200ms', style({ scale: 0 }))]),
]);

export const authIconAnimation = trigger('rotate', [
  transition('* => *', [
    animate(
      '300ms',
      keyframes([
        style({ transform: 'rotate(0deg)', offset: 0 }),
        style({ transform: 'rotate(360deg)', offset: 1 }),
      ])
    ),
  ]),
]);
export const removeToBottom = trigger('removeToBottom', [
  transition(':enter', [
    style({ position: 'relative', top: '10rem', opacity: 0 }),
    animate('200ms', style({ position: 'relative', top: '0', opacity: 1 })),
  ]),
  transition(':leave', [
    style({ position: 'relative', top: '10rem', opacity: 0 }),
  ]),
]);
export const removeToTop = trigger('removeToTop', [
  transition(':leave', [
    style({ position: 'relative', top: '0', opacity: 1 }),
    animate(
      '300ms',
      style({ position: 'relative', top: '-10rem', opacity: 0 })
    ),
  ]),
  transition(':enter', [
    style({ position: 'relative', top: '-10rem', opacity: 0 }),
    animate('300ms', style({ position: 'relative', top: '0', opacity: 1 })),
  ]),
]);

export const routeAnimations = trigger('routeAnimations', [
  transition('* => AuthPage', [
    style({ right: '-100%', position: 'absolute' }),
    animate('200ms', style({ right: 0, position: 'absolute' })),
  ]),
  transition('* => EditorPage', [
    style({ right: '-100%', position: 'absolute' }),
    animate('200ms', style({ right: 0, position: 'absolute' })),
  ]),
  transition('* => GetStartedPage', [
    style({ left: '-100%', position: 'absolute' }),
    animate('200ms', style({ left: 0, position: 'absolute' })),
    query('.content', [
      stagger(30, [
        animate(
          '2s cubic-bezier(0.35, 0, 0.25, 1)',
          style({ opacity: 0, transform: 'none' })
        ),
      ]),
    ]),
  ]),
]);
