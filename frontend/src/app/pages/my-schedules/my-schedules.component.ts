import { Component, inject, signal } from '@angular/core';
import { SchedulesService } from '../../shared/services/schedules/schedules.service';
import { Router, RouterLink } from '@angular/router';
import { Schedule } from '../../shared/interfaces/schedule.interface';
import { CommonModule } from '@angular/common';
import { ScheduleListItemComponent } from './schedule-list-item/schedule-list-item.component';
import { NoItemsComponent } from './no-items/no-items.component';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-my-schedules',
  standalone: true,
  imports: [
    CommonModule,
    NoItemsComponent,
    ScheduleListItemComponent,
    MatGridListModule,
    RouterLink,
  ],
  templateUrl: './my-schedules.component.html',
  styleUrl: './my-schedules.component.scss',
})
export class MySchedulesComponent {
  schedulesService = inject(SchedulesService);
  router = inject(Router);

  schedules = signal<Schedule[]>([]);

  breakpoint = 6;

  ngOnInit() {
    this.breakpoint = window.innerWidth <= 400 ? 1 : 5;

    this.schedulesService
      .getAll()
      .subscribe((schedules) => this.schedules.set(schedules));
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 400 ? 1 : 6;
  }
}
