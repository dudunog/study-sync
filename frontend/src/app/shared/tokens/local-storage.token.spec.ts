import { TestBed } from '@angular/core/testing';
import { LocalStorageToken } from './local-storage.token';

describe('LocalStorageToken', () => {
  it('should return localStorage from window', () => {
    const result = TestBed.inject(LocalStorageToken);

    expect(result).toBe(window.localStorage);
  });
});
