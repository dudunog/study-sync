import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthStoreService } from '../stores/auth/auth.store';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const authStoreService = inject(AuthStoreService);
  const router = inject(Router);

  if (!authStoreService.isLoggedIn()) {
    const signInUrlTree = router.parseUrl('sign-in');
    return new RedirectCommand(signInUrlTree);
  }

  return true;
};
