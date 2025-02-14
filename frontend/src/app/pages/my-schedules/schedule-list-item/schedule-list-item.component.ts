import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Schedule } from '../../../shared/interfaces/schedule.interface';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-schedule-list-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterLink],
  templateUrl: './schedule-list-item.component.html',
  styleUrl: './schedule-list-item.component.scss',
})
export class ScheduleListItemComponent {
  schedule = input.required<Schedule>();

  remove = output<Schedule>();

  edit = output<Schedule>();

  onRemove() {
    this.remove.emit(this.schedule());
  }

  onEdit() {
    this.edit.emit(this.schedule());
  }
}
