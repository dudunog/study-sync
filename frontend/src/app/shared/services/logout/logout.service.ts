import { inject, Injectable } from '@angular/core';
import { AuthStoreService } from '../../stores/auth/auth.store';
import { AuthTokenManagerService } from '../auth-token-manager/auth-token-manager.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  authStore = inject(AuthStoreService);
  authTokenManagerService = inject(AuthTokenManagerService);

  logout() {
    this.authStore.setAsLoggedOut();
    this.authTokenManagerService.removeToken();
    this.authTokenManagerService.removeRefreshToken();
  }
}
