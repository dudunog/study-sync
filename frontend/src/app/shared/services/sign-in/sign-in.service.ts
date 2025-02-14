import { inject, Injectable } from '@angular/core';
import { AuthStoreService } from '../../stores/auth/auth.store';
import { AuthService } from '../auth/auth.service';
import { AuthTokenManagerService } from '../auth-token-manager/auth-token-manager.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  authStore = inject(AuthStoreService);
  authService = inject(AuthService);
  authTokenManagerService = inject(AuthTokenManagerService);

  signIn(email: string, password: string) {
    return this.authService.signIn(email, password).pipe(
      tap(() => this.authStore.setAsLoggedIn()),
      tap(({ access, refresh }) => {
        this.authTokenManagerService.setToken(access);
        this.authTokenManagerService.setRefreshToken(refresh);
      })
    );
  }

  setAsLoggedInIfStorageTokenExists() {
    const token = this.authTokenManagerService.getToken();

    if (token) {
      this.authStore.setAsLoggedIn();
    }
  }
}
