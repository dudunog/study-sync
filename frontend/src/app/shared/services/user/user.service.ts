import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../../interfaces/user.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getProfile(): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/auth/users/me/`).pipe(
      catchError(() => {
        return throwError(
          () => new Error('An error occurred while getting user profile.')
        );
      })
    );
  }
}
