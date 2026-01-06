import {Routes} from '@angular/router';
import userRoutes from '../user/user.routes';

const mainRoutes: Routes = [
  {
    path: 'user',
    children: userRoutes
  }
];

export default mainRoutes;
