import {Component, inject, signal} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';
import {LanguageSelector} from '../../../shared/components/language-selector/language-selector';
import {AuthService} from '../../../openapi';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {UserDataService} from '../../../shared/services/user/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatButtonModule,
    MatIconModule,
    TranslatePipe,
    LanguageSelector,
    MatProgressSpinnerModule
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  authService = inject(AuthService);
  router = inject(Router);
  user = inject(UserDataService);

  loginForm = new FormGroup({
    username: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    password: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
  })

  passwordFieldType = signal<'password' | 'text'>('password');
  isLoading = signal(false);

  togglePasswordFieldType(): void {
    this.passwordFieldType.set(this.passwordFieldType() === 'password' ? "text" : "password");
  }

  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.authService.authenticateUserAdmin({
        username: this.loginForm.controls.username.value,
        password: this.loginForm.controls.password.value
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          if (response.success) {
            this.user.token = response.data!;
            this.router.navigate(['/user/profile']);
          }

        },
        complete: () => {
          this.isLoading.set(false);
        }
      })
  }
}
