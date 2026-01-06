import {Component, inject, model, signal} from '@angular/core';
import {BackButton} from "../../../shared/components/back-button/back-button";
import {ControlErrors} from "../../../shared/components/control-errors/control-errors";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatProgressBar} from "@angular/material/progress-bar";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RoleSelector} from "../../../shared/components/role-selector/role-selector";
import {TranslatePipe} from "@ngx-translate/core";
import {ActivatedRoute, Router} from '@angular/router';
import {RoleListViewDTO, UserControllerService, UserEditDTO, UserViewDTO} from '../../../openapi';

@Component({
  selector: 'app-user-edit-page',
  imports: [
    BackButton,
    ControlErrors,
    MatButton,
    MatCard,
    MatCardContent,
    MatFormField,
    MatInput,
    MatLabel,
    MatProgressBar,
    ReactiveFormsModule,
    RoleSelector,
    TranslatePipe
  ],
  templateUrl: './user-edit-page.html',
  styleUrl: './user-edit-page.scss',
})
export class UserEditPage {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  userControllerService = inject(UserControllerService);

  userId = signal<number | null>(null);
  isLoading = signal(false);
  roles = model<RoleListViewDTO[]>([]);

  editForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>('', [Validators.required]),
    firstName: new FormControl<string>('', [Validators.required]),
  })

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({user}) => {
      const userData = user as UserViewDTO;
      this.userId.set(userData.idUser!);
      this.editForm.patchValue({
        username: userData.username,
        lastName: userData.lastName,
        firstName: userData.firstName,
      });
      this.roles.set(userData.roles ?? [])
    });
  }

  submit(): void {
    if (this.editForm.invalid || this.userId() == null) {
      this.editForm.markAllAsTouched();
      return;
    }

    const userEditDTO: UserEditDTO = {
      username: this.editForm.controls.username.value!,
      firstName: this.editForm.controls.firstName.value!,
      lastName: this.editForm.controls.lastName.value!,
      roleIds: this.roles().map(role => role.idRole!)
    }

    this.isLoading.set(true);
    this.userControllerService.editUserUsingPUT(this.userId()!, userEditDTO).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/user']);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }
}
