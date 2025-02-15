import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { isLoggedInGuard } from './is-logged-in.guard';
import { AuthStoreService } from '../stores/auth/auth.store';
import { MockProvider } from 'ng-mocks';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-autheticated-route',
  template: '',
})
class FakeAutheticatedRouteComponent {}

@Component({
  selector: 'app-sign-in',
  template: '',
})
class FakeSignInComponent {}

describe('isLoggedInGuard', () => {
  let authStoreService: AuthStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(AuthStoreService),
        provideRouter([
          {
            path: 'fake-route',
            canActivate: [isLoggedInGuard],
            component: FakeAutheticatedRouteComponent,
          },
          {
            path: 'sign-in',
            component: FakeSignInComponent,
          },
        ]),
      ],
    });

    authStoreService = TestBed.inject(AuthStoreService);
  });

  describe('quando o usuário não estiver logado', () => {
    it('deve redirecionar para a rota de sign-in', async () => {
      const location = TestBed.inject(Location);
      const router = TestBed.inject(Router);

      expect(location.path()).toBe('');

      (authStoreService.isLoggedIn as jest.Mock).mockReturnValue(false);

      await router.navigate(['fake-route']);

      expect(location.path()).toBe('/sign-in');
    });
  });

  describe('quando o usuário estiver logado', () => {
    it('deve manter a nevegação', async () => {
      const location = TestBed.inject(Location);
      const router = TestBed.inject(Router);

      expect(location.path()).toBe('');

      (authStoreService.isLoggedIn as jest.Mock).mockReturnValue(true);

      await router.navigate(['fake-route']);

      expect(location.path()).toBe('/fake-route');
    });
  });
});
