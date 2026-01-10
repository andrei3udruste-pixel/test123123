import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {UserDataService} from '../../services/user/user';

export const loginGuard: CanActivateFn = () => {
  const user = inject(UserDataService);
  const router = inject(Router);

  if (!user.isAuthenticated) {
    return true;
  }

  return router.createUrlTree(['/profile']);
};
