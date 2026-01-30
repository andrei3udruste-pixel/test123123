import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TranslatePipe } from '@ngx-translate/core';

import {
  WithdrawalApiService,
  WithdrawalViewDTO,
} from '../../../shared/services/withdrawal/withdrawal-api.service';
import { WalletApiService, WalletViewDTO } from '../../../shared/services/wallet/wallet-api.service';
import { WithdrawalCreateDialog } from './withdrawal-create-dialog/withdrawal-create-dialog';

@Component({
  selector: 'app-withdraw-page',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    TranslatePipe,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './withdraw-page.html',
  styleUrl: './withdraw-page.scss',
})
export class WithdrawPage implements OnInit {
  private withdrawalApi = inject(WithdrawalApiService);
  private walletApi = inject(WalletApiService);
  private dialog = inject(MatDialog);

  wallet?: WalletViewDTO;
  withdrawals = signal<WithdrawalViewDTO[]>([]);
  isLoading = signal(false);

  // Pagination
  page = signal(0);
  pageSize = signal(10);
  totalItems = signal(0);
  pageSizeOptions = [5, 10, 25, 50];

  displayedColumns = ['createdAt', 'amount', 'convertedAmount', 'payoutMethod', 'status'];

  ngOnInit(): void {
    this.loadWallet();
    this.loadWithdrawals();
  }

  loadWallet(): void {
    this.walletApi.getMy().subscribe({
      next: (res) => {
        this.wallet = res.data;
      },
      error: (err) => {
        console.error('Failed to load wallet', err);
      },
    });
  }

  loadWithdrawals(): void {
    this.isLoading.set(true);
    this.withdrawalApi.getMy(this.page(), this.pageSize(), 'createdAt', 'desc').subscribe({
      next: (res: any) => {
        const content = res?.data?.content ?? res?.content ?? res?.data ?? [];
        const total = res?.data?.totalElements ?? res?.totalElements ?? content.length;
        this.withdrawals.set(content);
        this.totalItems.set(total);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load withdrawals', err);
        this.isLoading.set(false);
      },
    });
  }

  onPageChange(event: PageEvent): void {
    this.page.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadWithdrawals();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(WithdrawalCreateDialog, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadWithdrawals();
        this.loadWallet();
      }
    });
  }
}
