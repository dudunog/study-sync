import { Activity } from './activity.interface';

export type Visibility = 'public' | 'private';

export interface Schedule {
  created_at: Date;
  description: string;
  end_date: Date;
  id: number;
  start_date: Date;
  title: String;
  visibility: Visibility;
  activities: Activity[];
}

export interface CreateScheduleResponse extends Schedule {}

export type ScheduleWithoutId = Omit<Schedule, 'id'>;
