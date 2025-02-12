import { Routes } from '@angular/router';
import { CreateScheduleComponent } from './pages/create-schedule/create-schedule.component';

export const routes: Routes = [
  {
    path: 'study',
    component: CreateScheduleComponent,
  },
  {
    path: 'create-schedule',
    component: CreateScheduleComponent,
  },
  {
    path: 'my-schedules',
    component: CreateScheduleComponent,
  },
  {
    path: 'profile',
    component: CreateScheduleComponent,
  },
];
