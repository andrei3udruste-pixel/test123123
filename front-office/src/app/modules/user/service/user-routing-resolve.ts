import {inject, Injectable} from '@angular/core';
import {BaseResponseUserViewDTO, UserControllerService, UserViewDTO} from '../../../openapi';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {EMPTY, mergeMap, Observable, of} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserRoutingResolveService {
  userControllerService = inject(UserControllerService);
  router = inject(Router);

  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<UserViewDTO | null> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.userControllerService.getUserUsingGET(id, "response").pipe(
        mergeMap((userResponse: HttpResponse<BaseResponseUserViewDTO>) => {
          if (userResponse.body && userResponse.body.success) {
            return of(userResponse.body.data!)
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      )
    }
    return of(null);
  }
}
