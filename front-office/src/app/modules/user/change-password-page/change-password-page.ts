import {Component, inject, signal} from '@angular/core';
import {BackButton} from '../../../shared/components/back-button/back-button';
import {ControlErrors} from '../../../shared/components/control-errors/control-errors';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatProgressBar} from '@angular/material/progress-bar';
import {TranslatePipe} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {strongPasswordValidator} from '../../../shared/validators/strong-password';
import {matchingFieldsValidator} from '../../../shared/validators/matching-fields';
import {AuthService} from '../../../openapi';

@Component({
  selector: 'app-change-password-page',
  imports: [
    BackButton,
    ControlErrors,
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatFormField,
    MatInput,
    MatLabel,
    MatProgressBar,
    TranslatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './change-password-page.html',
  styleUrl: './change-password-page.scss',
})
export class ChangePasswordPage {
  router = inject(Router);
  authService = inject(AuthService);

  userId = signal<number | null>(null);
  isLoading = signal(false);

  changePasswordForm = new FormGroup({
    currentPassword: new FormControl<string>('', [Validators.required]),
    newPassword: new FormControl<string>('', [Validators.required, strongPasswordValidator()]),
    confirmNewPassword: new FormControl('', [Validators.required]),
  }, {
    validators: matchingFieldsValidator('newPassword', 'confirmNewPassword', 'passwordMismatch'),
  })

  submit(): void {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    // this.isLoading.set(true);
    // this.authService.resetPasswordSend({
    //   userEmailDTO: {
    //     newPassword: this.changePasswordForm.controls.newPassword.value!
    //   }
    // }).subscribe({
    //   next: () => {
    //     this.isLoading.set(false);
    //     this.router.navigate(['/user/profile']);
    //   },
    //   error: () => {
    //     this.isLoading.set(false);
    //   }
    // });
  }
}
