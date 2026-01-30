import {Routes} from '@angular/router';
import userRoutes from '../user/user.routes';
import withdrawalRoutes from '../withdrawal/withdrawal.routes';
import currencyRoutes from '../currency/currency.routes';
import paymentRoutes from '../payment/payment.routes';

const mainRoutes: Routes = [
  {
    path: 'user',
    children: userRoutes
  },
  {
    path: 'withdrawal',
    children: withdrawalRoutes
  },
  {
    path: 'currency',
    children: currencyRoutes
  },
  {
    path: 'payment',
    children: paymentRoutes
  }
];

export default mainRoutes;
