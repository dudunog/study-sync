import { TestBed } from '@angular/core/testing';

import { AuthTokenManagerService } from './auth-token-manager.service';

describe('AuthTokenManagerService', () => {
  let service: AuthTokenManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthTokenManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
