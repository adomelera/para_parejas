import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/home-view/home-view').then((m) => m.HomeViewComponent),
    title: 'Tantra para Parejas - Barcelona'
  },
  {
    path: 'sesiones',
    loadComponent: () =>
      import('./views/sessions-view/sessions-view').then((m) => m.SessionsViewComponent),
    title: 'Sesiones Privadas - Tantra para Parejas Barcelona'
  },
  {
    path: 'talleres',
    loadComponent: () =>
      import('./views/workshops-view/workshops-view').then((m) => m.WorkshopsViewComponent),
    title: 'Talleres Mensuales - Tantra para Parejas Barcelona'
  },
  {
    path: 'reservar',
    loadComponent: () =>
      import('./views/booking-view/booking-view').then((m) => m.BookingViewComponent),
    title: 'Reserva & Contacto - Tantra para Parejas Barcelona'
  },
  {
    path: 'espacio',
    loadComponent: () =>
      import('./views/space-view/space-view').then((m) => m.SpaceViewComponent),
    title: 'Espacio & Filosofía - Tantra para Parejas Barcelona'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
