import { Routes } from '@angular/router';
import { userAccessGuard } from '../../shared/guards/user-access/user-access-guard';
import { Authority } from '../../shared/models/authority';
import { WithdrawalListPage } from './withdrawal-list-page/withdrawal-list-page';
import { WithdrawalDetailsPage } from './withdrawal-details-page/withdrawal-details-page';

const withdrawalRoutes: Routes = [
  {
    path: '',
    component: WithdrawalListPage,
    canActivate: [userAccessGuard],
    data: {
      authorities: [Authority.ROLE_ACCOUNTING, Authority.ROLE_ADMIN]
    }
  },
  {
    path: ':id',
    component: WithdrawalDetailsPage,
    canActivate: [userAccessGuard],
    data: { authorities: [Authority.ROLE_ACCOUNTING, Authority.ROLE_ADMIN] }
  }
];

export default withdrawalRoutes;
