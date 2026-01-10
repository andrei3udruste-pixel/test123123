import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {IBaseResponse} from '../../models/base-response';
import {inject, Injector} from '@angular/core';
import {MessageService} from '../../services/message/message';
import {UserDataService} from '../../services/user/user';
import {Router} from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const injector = inject(Injector);

  return next(req).pipe(
    catchError((errorResponse: HttpErrorResponse) => {
      const message = injector.get(MessageService);
      const router = injector.get(Router);
      const user = injector.get(UserDataService);

      if(errorResponse.status === 401) {
        user.token = null;
        router.navigate(['/login']);
      }

      const responseBody = errorResponse.error as IBaseResponse<any>;
      const errorMessage = responseBody.error;

      if (errorMessage) {
        const errorMessageKey = `error.${errorMessage}`;
        message.openSnackBarMessageKey(errorMessageKey);
      }

      return throwError(() => errorResponse);
    })
  )
};
