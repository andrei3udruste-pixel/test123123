import { CanActivateFn } from '@angular/router';
import {inject} from '@angular/core';
import {UserService} from '../../services/user/user';

export const userAccessGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const authorities = route.params['authorities'];

  if(!authorities || !authorities.length) {
    return true;
  }

  return userService.hasAnyAuthority(authorities);
};
