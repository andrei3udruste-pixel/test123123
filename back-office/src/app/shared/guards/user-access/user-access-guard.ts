import {CanActivateFn} from '@angular/router';
import {inject} from '@angular/core';
import {UserDataService} from '../../services/user/user';

export const userAccessGuard: CanActivateFn = (route) => {
  const userService = inject(UserDataService);
  const authorities = route.params['authorities'];

  if (!authorities || !authorities.length) {
    return true;
  }

  return userService.hasAnyAuthority(authorities);
};
