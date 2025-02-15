export type Category = 'class' | 'review' | 'test';
export type Priority = 'high' | 'medium' | 'low';

export interface Activity {
  id: string;
  name: string | null;
  duration: number | null;
  category: Category;
  priority: Priority;
  schedule: string;
}
