import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Schedule,
  ScheduleWithoutId,
} from '../../interfaces/schedule.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SchedulesService {
  baseUrl = environment.baseUrl;

  httpClient = inject(HttpClient);

  getAll(): Observable<Schedule[]> {
    return this.httpClient.get<Schedule[]>(`${this.baseUrl}/api-auth/schedule`);
  }

  getById(id: string): Observable<Schedule> {
    return this.httpClient.get<Schedule>(
      `${this.baseUrl}/api-auth/schedules/${id}`
    );
  }

  post(payload: Omit<ScheduleWithoutId, 'created_at'>): Observable<Schedule> {
    return this.httpClient.post<Schedule>(
      `${this.baseUrl}/api-auth/schedule/`,
      payload
    );
  }

  put(
    id: string,
    payload: Omit<ScheduleWithoutId, 'created_at'>
  ): Observable<Schedule> {
    return this.httpClient.put<Schedule>(
      `${this.baseUrl}/api-auth/schedules/${id}`,
      payload
    );
  }

  patch(id: string, payload: Partial<Schedule>): Observable<Schedule> {
    return this.httpClient.patch<Schedule>(
      `${this.baseUrl}/api-auth/schedule/${id}`,
      payload
    );
  }

  delete(id: string): Observable<Schedule> {
    return this.httpClient.delete<Schedule>(
      `${this.baseUrl}/api-auth/schedules/${id}`
    );
  }
}
