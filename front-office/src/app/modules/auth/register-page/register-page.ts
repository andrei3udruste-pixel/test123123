import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslatePipe } from '@ngx-translate/core';

import { AuthService, UserSignUpDTO } from '../../../openapi';
import { LanguageSelector } from '../../../shared/components/language-selector/language-selector';
import { MessageService } from '../../../shared/services/message/message';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink,
    TranslatePipe,
    LanguageSelector
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  errorMessage = signal('');
  isLoading = signal(false);
  passwordFieldType = signal<'password' | 'text'>('password');
  confirmPasswordFieldType = signal<'password' | 'text'>('password');

  registerForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
    confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  togglePasswordFieldType(): void {
    this.passwordFieldType.set(this.passwordFieldType() === 'password' ? 'text' : 'password');
  }

  toggleConfirmPasswordFieldType(): void {
    this.confirmPasswordFieldType.set(this.confirmPasswordFieldType() === 'password' ? 'text' : 'password');
  }

  submit(): void {
    this.errorMessage.set('');

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const password = this.registerForm.controls.password.value;
    const confirmPassword = this.registerForm.controls.confirmPassword.value;

    if (password !== confirmPassword) {
      this.errorMessage.set('error.form.passwordMismatch');
      return;
    }

    const body: UserSignUpDTO = {
      username: this.registerForm.controls.username.value,
      email: this.registerForm.controls.email.value,
      password: password
    };

    this.isLoading.set(true);

    this.authService.createUser(body).subscribe({
      next: () => {
        this.messageService.success('auth.register.success');
        this.registerForm.reset();
        this.isLoading.set(false);
        this.router.navigate(['/login']);
      },
      error: () => {
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }
}
