import {Routes} from '@angular/router';

import {LoginPage} from './modules/auth/login-page/login-page';
import {loginGuard} from './shared/guards/login/login-guard';
import {authGuard} from './shared/guards/auth/auth-guard';
import {Layout} from './modules/main/layout/layout';
import mainRoutes from './modules/main/main.routes';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
    canActivate: [loginGuard]
  },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: mainRoutes
  },
  {
    path: '**',
    redirectTo: '/profile'
  }
];
