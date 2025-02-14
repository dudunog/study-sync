import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenResponse } from '../../interfaces/token.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  signIn(username: string, password: string): Observable<TokenResponse> {
    return this.httpClient
      .post<TokenResponse>(`${this.baseUrl}/auth/jwt/create`, {
        username,
        password,
      })
      .pipe(
        catchError(() => {
          return throwError(
            () => new Error('An error occurred while logging in.')
          );
        })
      );
  }
}
