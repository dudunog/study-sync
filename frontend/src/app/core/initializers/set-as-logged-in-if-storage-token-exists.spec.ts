import { TestBed } from '@angular/core/testing';
import { setAsLoggedInIfStorageTokenExistsInitializerProvider } from './set-as-logged-in-if-storage-token-exists.initializer';
import { MockProvider } from 'ng-mocks';
import { SignInService } from '../../shared/services/sign-in/sign-in.service';

describe('setAsLoggedInIfStorageTokenExistsInitializer', () => {
  it('should sign in the user when the authentication token exists', () => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(SignInService),
        setAsLoggedInIfStorageTokenExistsInitializerProvider,
      ],
    });

    const signInService = TestBed.inject(SignInService);

    expect(signInService.setAsLoggedInIfStorageTokenExists).toHaveBeenCalled();
  });
});
