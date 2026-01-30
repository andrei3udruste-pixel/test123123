import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

import { AuthService } from '../../../openapi';
import { LanguageSelector } from '../../../shared/components/language-selector/language-selector';

@Component({
  selector: 'app-confirm-email-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    RouterLink,
    TranslatePipe,
    LanguageSelector
  ],
  templateUrl: './confirm-email-page.html',
  styleUrl: './confirm-email-page.scss',
})
export class ConfirmEmailPage implements OnInit {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  isLoading = signal(true);
  isSuccess = signal(false);
  errorMessage = signal('');

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.isLoading.set(false);
      this.errorMessage.set('auth.confirmEmail.invalidToken');
      return;
    }

    this.authService.confirmEmail(token).subscribe({
      next: (response) => {
        if (response.success) {
          this.isSuccess.set(true);
        } else {
          this.errorMessage.set('auth.confirmEmail.failed');
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('auth.confirmEmail.failed');
        this.isLoading.set(false);
      }
    });
  }
}
