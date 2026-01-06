import {Component, inject} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {LayoutStateService} from '../../../shared/services/layout-state/layout-state';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';
import {Authority} from '../../../shared/models/authority';
import {MatRippleModule} from '@angular/material/core';
import {Router} from '@angular/router';
import {UserService} from '../../../shared/services/user/user';

interface SidenavNode {
  labelKey: string;
  link?: string[];
  children?: SidenavNode[];
  roles?: Authority[];
}

@Component({
  selector: 'app-sidenav',
  imports: [
    MatDrawer,
    MatTreeModule,
    MatIconModule,
    MatIconButton,
    TranslatePipe,
    MatRippleModule,
  ],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  layoutState = inject(LayoutStateService);
  user = inject(UserService);

  router = inject(Router);

  readonly sidenavNodes: SidenavNode[] = [
    {
      labelKey: "sidenav.users",
      link: ['/user'],
      roles: [Authority.ROLE_ADMINISTRATOR]
    }
  ]

  childrenAccessor = (node: SidenavNode) => {
    if (node.roles && !this.user.hasAnyAuthority(node.roles)) {
      return [];
    }

    return node.children ?? [];
  }

  hasChild = (_: number, node: SidenavNode) => !!node.children && node.children.length > 0;

  navigate(node: SidenavNode) {
    if (node.link) {
      this.layoutState.toggleSidenavOpen();
      this.router.navigate(node.link);
    }
  }
}
