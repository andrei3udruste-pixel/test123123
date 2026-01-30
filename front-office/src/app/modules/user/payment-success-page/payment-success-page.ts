import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { WalletDataService } from '../../../shared/services/wallet/wallet';

@Component({
  selector: 'app-payment-success-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    TranslatePipe
  ],
  templateUrl: './payment-success-page.html',
  styleUrl: './payment-success-page.scss'
})
export class PaymentSuccessPage implements OnInit {
  private walletData = inject(WalletDataService);

  ngOnInit(): void {
    // Refresh wallet balance after successful payment
    this.walletData.loadMyWallet();
  }
}
