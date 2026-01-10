import {Component, inject, OnInit} from '@angular/core';
import {Navbar} from '../navbar/navbar';
import {RouterOutlet} from '@angular/router';
import {UserDataService} from '../../../shared/services/user/user';
import {MatSidenavContainer} from '@angular/material/sidenav';
import {Sidenav} from '../sidenav/sidenav';

@Component({
  selector: 'app-layout',
  imports: [
    Navbar,
    RouterOutlet,
    Sidenav,
    MatSidenavContainer,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout implements OnInit {
  user = inject(UserDataService);

  ngOnInit(): void {
    if (this.user.isAuthenticated) {
      this.user.loadCurrentUser();
    }
  }
}
