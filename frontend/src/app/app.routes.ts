import { Routes } from '@angular/router';
import { isLoggedInGuard } from './shared/guards/is-logged-in.guard';

export const routes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./pages/sign-in/sign-in.component').then(
        (m) => m.SignInComponent
      ),
  },
  {
    path: '',
    canActivate: [isLoggedInGuard],
    children: [
      {
        path: 'study',
        loadComponent: () =>
          import('./pages/create-schedule/create-schedule.component').then(
            (m) => m.CreateScheduleComponent
          ),
      },
      {
        path: 'create-schedule',
        loadComponent: () =>
          import('./pages/create-schedule/create-schedule.component').then(
            (m) => m.CreateScheduleComponent
          ),
      },
      {
        path: 'my-schedules',
        loadComponent: () =>
          import('./pages/my-schedules/my-schedules.component').then(
            (m) => m.MySchedulesComponent
          ),
      },
      {
        path: 'schedule/:id',
        loadComponent: () =>
          import('./pages/schedule-details/schedule-details.component').then(
            (m) => m.ScheduleDetailsComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/create-schedule/create-schedule.component').then(
            (m) => m.CreateScheduleComponent
          ),
      },
    ],
  },
];
