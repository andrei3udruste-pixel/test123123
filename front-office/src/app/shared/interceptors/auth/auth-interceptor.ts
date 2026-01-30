import { HttpInterceptorFn } from '@angular/common/http';
import {UserDataService} from '../../services/user/user';
import {inject, Injector} from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const injector = inject(Injector);
  const user = injector.get(UserDataService);
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
