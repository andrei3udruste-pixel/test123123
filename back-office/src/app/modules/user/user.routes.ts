import {Routes} from '@angular/router';
import {UserListPage} from './user-list-page/user-list-page';
import {UserViewPage} from './user-view-page/user-view-page';
import {UserRoutingResolveService} from './service/user-routing-resolve';
import {ProfilePage} from './profile-page/profile-page';
import {userAccessGuard} from '../../shared/guards/user-access/user-access-guard';
import {Authority} from '../../shared/models/authority';
import {UserEditPage} from './user-edit-page/user-edit-page';
import {ChangePasswordPage} from './change-password-page/change-password-page';

const userRoutes: Routes = [
  {
    path: 'profile',
    component: ProfilePage,
  },
  {
    path: 'change-password-page',
    component: ChangePasswordPage,
  },
  {
    path: '',
    component: UserListPage,
    data: {
      defaultSort: "idUser,asc",
      authorities: [Authority.ROLE_ADMIN]
    },
    canActivate: [userAccessGuard],
  },
  {
    path: ':id/view',
    component: UserViewPage,
    resolve: {
      user: UserRoutingResolveService
    },
    canActivate: [userAccessGuard],
    data: {
      authorities: [Authority.ROLE_ADMIN]
    }
  },
  {
    path: ':id/edit',
    component: UserEditPage,
    resolve: {
      user: UserRoutingResolveService
    },
    canActivate: [userAccessGuard],
    data: {
      authorities: [Authority.ROLE_ADMIN]
    }
  },
]

export default userRoutes;
