import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {UserDataService} from '../../services/user/user';
import {Authority} from '../../models/authority';

export const authGuard: CanActivateFn = (route) => {
  const user = inject(UserDataService);
  const router = inject(Router);

  if (user.isAuthenticated) {
    return true;
  }

  const roles = route.data['roles'] as Authority[];
  if (!roles || roles.length === 0) {
    return true;
  }

  if (user.hasAnyAuthority(roles)) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
