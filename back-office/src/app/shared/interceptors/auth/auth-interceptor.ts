import { HttpInterceptorFn } from '@angular/common/http';
import {UserDataService} from '../../services/user/user';
import {inject} from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const user = inject(UserDataService);
  const token = user.token;

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};
