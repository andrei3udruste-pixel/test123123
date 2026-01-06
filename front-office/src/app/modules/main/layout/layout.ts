import {Component, inject, OnInit} from '@angular/core';
import {Navbar} from '../navbar/navbar';
import {RouterOutlet} from '@angular/router';
import {UserService} from '../../../shared/services/user/user';
import {MatDrawerContainer} from '@angular/material/sidenav';
import {Sidenav} from '../sidenav/sidenav';

@Component({
  selector: 'app-layout',
  imports: [
    Navbar,
    RouterOutlet,
    MatDrawerContainer,
    Sidenav,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout implements OnInit {
  user = inject(UserService);

  ngOnInit(): void {
    if (this.user.isAuthenticated) {
      this.user.loadCurrentUser();
    }
  }
}
