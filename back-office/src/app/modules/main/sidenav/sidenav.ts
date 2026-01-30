import {Component, computed, inject} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {LayoutStateService} from '../../../shared/services/layout-state/layout-state';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';
import {Authority} from '../../../shared/models/authority';
import {MatRippleModule} from '@angular/material/core';
import {Router} from '@angular/router';
import {UserDataService} from '../../../shared/services/user/user';


interface SidenavNode {
  labelKey: string;
  link?: string[];
  children?: SidenavNode[];
  roles?: Authority[];
}

@Component({
  selector: 'app-sidenav',
  imports: [
    MatTreeModule,
    MatIconModule,
    MatIconButton,
    TranslatePipe,
    MatRippleModule,
    MatSidenav,

  ],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
  standalone: true
})
export class Sidenav {
  layoutState = inject(LayoutStateService);
  userService = inject(UserDataService);

  router = inject(Router);

  readonly allSidenavNodes: SidenavNode[] = [
    {
      labelKey: "sidenav.users",
      link: ['/user'],
      roles: [Authority.ROLE_ADMIN]
    },
    {
      labelKey: "sidenav.withdrawals",
      link: ['/withdrawal'],
      roles: [Authority.ROLE_ACCOUNTING, Authority.ROLE_ADMIN]
    },
    {
      labelKey: "sidenav.currencies",
      link: ['/currency'],
      roles: [Authority.ROLE_ADMIN]
    }
  ];

  sidenavNodes = computed<SidenavNode[]>(() => {
    return this.allSidenavNodes.filter((node: SidenavNode) => node.roles && this.userService.hasAnyAuthority(node.roles));
  })

  childrenAccessor = (node: SidenavNode) => {
    if (node.roles && !this.userService.hasAnyAuthority(node.roles)) {
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
