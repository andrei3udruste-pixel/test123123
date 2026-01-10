import {Component, inject, model, signal} from '@angular/core';
import {BackButton} from "../../../shared/components/back-button/back-button";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatProgressBar} from "@angular/material/progress-bar";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RoleSelector} from "../../../shared/components/role-selector/role-selector";
import {TranslatePipe} from "@ngx-translate/core";
import {ActivatedRoute, Router} from '@angular/router';
import {UserService, UserViewAdminDTO} from '../../../openapi';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-user-edit-page',
  imports: [BackButton, MatButton, MatCard, MatCardContent, MatProgressBar, ReactiveFormsModule, RoleSelector, TranslatePipe, MatCheckbox],
  templateUrl: './user-edit-page.html',
  styleUrl: './user-edit-page.scss',
})
export class UserEditPage {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);

  userId = signal<string | null>(null);
  isLoading = signal(false);
  roles = model<string[]>([]);

  editForm = new FormGroup({
    enabled: new FormControl<boolean>(false, [Validators.required]),
    locked: new FormControl<boolean>(false, [Validators.required]),
  })

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({user}) => {
      const userData = user as UserViewAdminDTO;
      this.userId.set(userData.id!);
      this.editForm.patchValue({
        enabled: userData.enabled, locked: userData.locked,
      });
      this.roles.set(userData.roles ?? [])
    });
  }

  submit(): void {
    if (this.editForm.invalid || this.userId() == null) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.userService.updateUserAdmin(
      this.userId()!,
      {
        enabled: this.editForm.controls.enabled.value!,
        locked: this.editForm.controls.locked.value!,
        roles: this.roles()
      }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/user']);
      }, error: () => {
        this.isLoading.set(false);
      }
    });
  }
}
