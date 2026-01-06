import {computed, inject, Injectable} from '@angular/core';
import {RoleControllerService, RoleListViewDTO} from '../../../openapi';
import {UserService} from '../user/user';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  roleControllerService = inject(RoleControllerService);
  userService = inject(UserService);

  private rolesSignal = toSignal(
    this.roleControllerService.getAllRolesUsingGET()
      .pipe(map(response => response.data || [])),
    {initialValue: [] as RoleListViewDTO[]},
  );

  private _allRoles = computed(() => {
    if (this.userService.isAuthenticated) {
      return this.rolesSignal();
    }
    return [];
  });

  get allRoles(): RoleListViewDTO[] {
    return this._allRoles();
  }
}
