import { Routes } from '@angular/router';
import { CurrencyListPage } from './currency-list-page/currency-list-page';
import { userAccessGuard } from '../../shared/guards/user-access/user-access-guard';
import { Authority } from '../../shared/models/authority';

const currencyRoutes: Routes = [
  {
    path: '',
    component: CurrencyListPage,
    data: {
      authorities: [Authority.ROLE_ADMIN]
    },
    canActivate: [userAccessGuard]
  }
];

export default currencyRoutes;
