import { inject, Injectable } from '@angular/core';
import { AuthStoreService } from '../../stores/auth/auth.store';
import { AuthService } from '../auth/auth.service';
import { AuthTokenManagerService } from '../auth-token-manager/auth-token-manager.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  authStore = inject(AuthStoreService);
  authService = inject(AuthService);
  authTokenManagerService = inject(AuthTokenManagerService);

  signUp(username: string, email: string, password: string) {
    return this.authService
      .signUp(username, email, password)
      .pipe(tap(() => this.authStore.setAsLoggedIn()));
  }

  setAsLoggedInIfStorageTokenExists() {
    const token = this.authTokenManagerService.getToken();

    if (token) {
      this.authStore.setAsLoggedIn();
    }
  }
}
