import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-payment-cancelled-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe
  ],
  templateUrl: './payment-cancelled-page.html',
  styleUrl: './payment-cancelled-page.scss'
})
export class PaymentCancelledPage {
  private router = inject(Router);

  goToProfile(): void {
    this.router.navigate(['/user', 'profile']);
  }

  tryAgain(): void {
    this.router.navigate(['/user', 'profile']);
  }
}
