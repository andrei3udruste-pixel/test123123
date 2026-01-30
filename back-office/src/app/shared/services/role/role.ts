import {computed, inject, Injectable} from '@angular/core';
import {AdminService} from '../../../openapi';
import {UserDataService} from '../user/user';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleDataService {
  adminService = inject(AdminService);
  userService = inject(UserDataService);

  private rolesSignal = toSignal(
    this.adminService.getAllRoles()
      .pipe(map(response => response.data || [])),
    {initialValue: [] as string[]},
  );

  private _allRoles = computed(() => {
    if (this.userService.isAuthenticated) {
      return this.rolesSignal();
    }
    return [];
  });

  get allRoles(): string[] {
    return this._allRoles();
  }
}
