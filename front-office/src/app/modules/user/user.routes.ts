import {Routes} from '@angular/router';
import {UserListPage} from './user-list-page/user-list-page';
import {UserViewPage} from './user-view-page/user-view-page';
import {UserRoutingResolveService} from './service/user-routing-resolve';
import {ProfilePage} from './profile-page/profile-page';
import {ChangePasswordPage} from './change-password-page/change-password-page';
import {userAccessGuard} from '../../shared/guards/user-access/user-access-guard';
import {Authority} from '../../shared/models/authority';
import {UserAddPage} from './user-add-page/user-add-page';
import {UserEditPage} from './user-edit-page/user-edit-page';

const userRoutes: Routes = [
  {
    path: 'profile',
    component: ProfilePage,
  },
  {
    path: 'change-password',
    component: ChangePasswordPage,
  },
  {
    path: '',
    component: UserListPage,
    data: {
      defaultSort: "idUser,asc",
      authorities: [Authority.ROLE_ADMINISTRATOR]
    },
    canActivate: [userAccessGuard],
  },
  {
    path: 'add',
    component: UserAddPage,
    canActivate: [userAccessGuard],
    data: {
      authorities: [Authority.ROLE_ADMINISTRATOR]
    }
  },
  {
    path: ':id/view',
    component: UserViewPage,
    resolve: {
      user: UserRoutingResolveService
    },
    canActivate: [userAccessGuard],
    data: {
      authorities: [Authority.ROLE_ADMINISTRATOR]
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
      authorities: [Authority.ROLE_ADMINISTRATOR]
    }
  },
  {
    path: ':id/change-password',
    component: ChangePasswordPage,
    resolve: {
      user: UserRoutingResolveService
    },
    canActivate: [userAccessGuard],
    data: {
      authorities: [Authority.ROLE_ADMINISTRATOR]
    }
  }
]

export default userRoutes;
