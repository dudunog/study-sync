import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { catchError, throwError } from 'rxjs';
import {
  CreateScheduleResponse,
  Visibility,
} from '../../interfaces/schedule.interface';
import { Category, Priority } from '../../interfaces/activity.interface';

@Injectable({
  providedIn: 'root',
})
export class CreateScheduleService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  execute(
    title: string,
    description: string,
    startDate: string,
    endDate: string,
    visibility: Visibility,
    activities: {
      title: string;
      duration: number;
      category: Category;
      priority: Priority;
    }[]
  ) {
    return this.httpClient
      .post<CreateScheduleResponse>(`${this.baseUrl}/api-auth/schedule`, {
        title,
        description,
        start_date: startDate,
        end_date: endDate,
        visibility,
        activities,
      })
      .pipe(
        catchError(() => {
          return throwError(
            () => new Error('An error occurred while creating a schedule.')
          );
        })
      )
      .pipe();
  }
}
