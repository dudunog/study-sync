import { APP_INITIALIZER, FactoryProvider, inject } from '@angular/core';
import { SignInService } from '../../shared/services/sign-in/sign-in.service';

export const setAsLoggedInIfStorageTokenExistsInitializerProvider: FactoryProvider =
  {
    provide: APP_INITIALIZER,
    useFactory: setAsLoggedInIfStorageTokenExistsInitializer,
    multi: true,
  };

export function setAsLoggedInIfStorageTokenExistsInitializer() {
  const loginFacadeService = inject(SignInService);

  return () => {
    loginFacadeService.setAsLoggedInIfStorageTokenExists();
  };
}
