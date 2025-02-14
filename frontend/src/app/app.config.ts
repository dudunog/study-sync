import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { addAuthorizationHeaderInterceptor } from './core/interceptors/add-authorization-header/add-authorization-header.interceptor';
import { setAsLoggedInIfStorageTokenExistsInitializerProvider } from './core/initializers/set-as-logged-in-if-storage-token-exists.initializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([addAuthorizationHeaderInterceptor])),
    provideAnimationsAsync(),
    setAsLoggedInIfStorageTokenExistsInitializerProvider,
  ],
};
