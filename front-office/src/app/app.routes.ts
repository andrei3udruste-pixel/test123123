import {Routes} from '@angular/router';

import { RegisterPage } from './modules/auth/register-page/register-page';
import { ConfirmEmailPage } from './modules/auth/confirm-email-page/confirm-email-page';
import {LoginPage} from './modules/auth/login-page/login-page';
import {loginGuard} from './shared/guards/login/login-guard';
import {authGuard} from './shared/guards/auth/auth-guard';
import {Layout} from './modules/main/layout/layout';
import mainRoutes from './modules/main/main.routes';
import { BlackjackComponent } from './features/blackjack/blackjack.component';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterPage,
    canActivate: [loginGuard]
  },
  {
    path: 'confirm-email',
    component: ConfirmEmailPage
  },
  {
    path: 'login',
    component: LoginPage,
    canActivate: [loginGuard]
  },

  {
  path: 'blackjack',
  loadChildren: () => import('./modules/blackjack/blackjack.routes').then(m => m.default)
},
  
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: mainRoutes
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
