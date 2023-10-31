import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminauthGuard } from './adminauth.guard';

describe('adminauthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminauthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
