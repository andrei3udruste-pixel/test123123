import {Routes} from '@angular/router';
import userRoutes from '../user/user.routes';
import withdrawalRoutes from '../withdrawal/withdrawal.routes';

const mainRoutes: Routes = [
  {
    path: 'user',
    children: userRoutes
  },
  {
    path: 'withdrawal',
    children: withdrawalRoutes
  }
];

export default mainRoutes;
