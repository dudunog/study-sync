import { inject, Injectable } from '@angular/core';
import { LocalStorageToken } from '../../tokens/local-storage.token';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenManagerService {
  #tokenKey = 'access-token';
  #refreshTokenKey = 'refresh-access-token';

  #localStorage = inject(LocalStorageToken);

  setToken(token: string) {
    this.#localStorage.setItem(this.#tokenKey, token);
  }

  setRefreshToken(token: string) {
    this.#localStorage.setItem(this.#refreshTokenKey, token);
  }

  getToken() {
    return this.#localStorage.getItem(this.#tokenKey);
  }

  getRefreshToken() {
    return this.#localStorage.getItem(this.#refreshTokenKey);
  }

  removeToken() {
    return this.#localStorage.removeItem(this.#tokenKey);
  }

  removeRefreshToken() {
    return this.#localStorage.removeItem(this.#refreshTokenKey);
  }
}
