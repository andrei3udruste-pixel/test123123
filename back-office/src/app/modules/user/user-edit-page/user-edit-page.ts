import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import {
  UserService,
  UserViewAdminDTO,
  UserUpdateAdminDTO,
} from '../../../openapi';


import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-user-edit-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,

    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatProgressBarModule,
    MatIconModule,

    TranslatePipe,
  ],
  templateUrl: './user-edit-page.html',
  styleUrl: './user-edit-page.scss',
})
export class UserEditPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);

  user!: UserViewAdminDTO;

  loading = false;

  readonly roles = ['ADMIN', 'CLIENT'];

  form = new FormGroup({
    enabled: new FormControl<boolean>(false),
    locked: new FormControl<boolean>(false),
    roles: new FormControl<string[]>([]),
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.loading = true;

    this.userService.getProfileAdmin(id).subscribe({
      next: (res) => {
        this.user = res.data!;
        this.form.setValue({
          enabled: this.user.enabled!,
          locked: this.user.locked!,
          roles: this.user.roles ?? [],
        });
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  save(): void {
    if (!this.user) return;

    const body: UserUpdateAdminDTO = {
      enabled: this.form.value.enabled!,
      locked: this.form.value.locked!,
      roles: this.form.value.roles!,
    };

    this.loading = true;

    this.userService.updateUserAdmin(this.user.id!, body).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/user']);
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
