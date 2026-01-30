import {Component, inject, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {UserDataService} from '../../../shared/services/user/user';
import {MatCardModule} from '@angular/material/card';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';
import {Router, RouterLink} from '@angular/router';

import {MatList, MatListItem, MatListItemIcon, MatListItemLine, MatListItemTitle} from '@angular/material/list';

@Component({
  selector: 'app-profile-page',
  imports: [
    MatCardModule,
    TranslatePipe,
    MatIconModule,
    MatRippleModule,
    MatList,
    MatListItem,
    MatListItemTitle,
    MatListItemLine,
    MatListItemIcon,
    RouterLink,
    DatePipe,
  ],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
  standalone: true
})
export class ProfilePage implements OnInit {
  user = inject(UserDataService);
  router = inject(Router);


  ngOnInit(): void {
    this.user.loadCurrentUser();
  }

  logout(): void {
    this.user.token = null;
    this.router.navigate(['/login']);


  }
}
