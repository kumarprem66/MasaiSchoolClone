import { CanActivateFn } from '@angular/router';

export const adminauthGuard: CanActivateFn = (route, state) => {
  return true;
};
