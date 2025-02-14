import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStoreService } from '../../../shared/stores/auth/auth.store';
import { AuthTokenManagerService } from '../../../shared/services/auth-token-manager/auth-token-manager.service';

export const addAuthorizationHeaderInterceptor: HttpInterceptorFn = (
  req,
  next
) => {
  const authStoreService = inject(AuthStoreService);

  if (authStoreService.isLoggedIn()) {
    const authTokenManagerService = inject(AuthTokenManagerService);

    const token = authTokenManagerService.getToken() as string;

    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  return next(req);
};
