import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import {
  UserService,
  UserViewAdminDTO,
} from '../../../openapi';

/* Angular Material */
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-user-view-page',
  standalone: true,
  imports: [
    RouterLink,

    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatChipsModule,

    TranslatePipe,
  ],
  templateUrl: './user-view-page.html',
  styleUrl: './user-view-page.scss',
})
export class UserViewPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserService);

  user!: UserViewAdminDTO;
  loading = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.loading = true;

    this.userService.getProfileAdmin(id).subscribe({
      next: (res) => {
        this.user = res.data!;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
