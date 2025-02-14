export type Visibility = 'public' | 'private';

export interface CreateScheduleResponse {
  created_at: Date;
  description: string;
  end_date: Date;
  id: number;
  start_date: Date;
  title: String;
  visibility: Visibility;
}
