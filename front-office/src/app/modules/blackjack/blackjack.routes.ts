import { Routes } from '@angular/router';
import { BlackjackComponent } from '../../features/blackjack/blackjack.component';
import { userAccessGuard } from '../../shared/guards/user-access/user-access-guard';
import { Authority } from '../../shared/models/authority';

const blackjackRoutes: Routes = [
  {
    path: '',
    component: BlackjackComponent,
    canActivate: [userAccessGuard],
    data: { authorities: [Authority.ROLE_USER, Authority.ROLE_ADMINISTRATOR] }
  }
];

export default blackjackRoutes;