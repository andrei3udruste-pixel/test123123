import {inject, Injectable} from '@angular/core';
import {BaseResponseUserViewAdminDTO, BaseResponseUserViewDTO, UserService, UserViewDTO} from '../../../openapi';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {EMPTY, mergeMap, Observable, of} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserRoutingResolveService {
  userService = inject(UserService);
  router = inject(Router);

  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<UserViewDTO | null> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.userService.getProfileAdmin(id, "response").pipe(
        mergeMap((userResponse: HttpResponse<BaseResponseUserViewAdminDTO>) => {
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
