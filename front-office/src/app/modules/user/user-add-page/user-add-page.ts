import {Component, inject, model, signal} from '@angular/core';
import {MatCard, MatCardContent} from '@angular/material/card';
import {BackButton} from '../../../shared/components/back-button/back-button';
import {TranslatePipe} from '@ngx-translate/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {RoleSelector} from '../../../shared/components/role-selector/role-selector';
import {matchingFieldsValidator} from '../../../shared/validators/matching-fields';
import {strongPasswordValidator} from '../../../shared/validators/strong-password';
import {ControlErrors} from '../../../shared/components/control-errors/control-errors';
import {RoleListViewDTO, UserAddDTO, UserControllerService} from '../../../openapi';
import {Router} from '@angular/router';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-user-add-page',
  imports: [
    MatCard,
    MatCardContent,
    BackButton,
    TranslatePipe,
    MatLabel,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    RoleSelector,
    ControlErrors,
    MatProgressBar
  ],
  templateUrl: './user-add-page.html',
  styleUrl: './user-add-page.scss',
})
export class UserAddPage {
  router = inject(Router);
  userControllerService = inject(UserControllerService);

  isLoading = signal(false);
  roles = model<RoleListViewDTO[]>([]);

  addForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    lastName: new FormControl<string>('', [Validators.required]),
    firstName: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required, strongPasswordValidator()]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, {
    validators: matchingFieldsValidator('password', 'confirmPassword', 'passwordMismatch'),
  })

  submit(): void {
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }

    const userAddDTO: UserAddDTO = {
      username: this.addForm.controls.username.value!,
      email: this.addForm.controls.email.value!,
      firstName: this.addForm.controls.firstName.value!,
      lastName: this.addForm.controls.lastName.value!,
      password: this.addForm.controls.password.value!,
      roleIds: this.roles().map(role => role.idRole!)
    }

    this.isLoading.set(true);
    this.userControllerService.addUserUsingPOST(userAddDTO).subscribe({
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
