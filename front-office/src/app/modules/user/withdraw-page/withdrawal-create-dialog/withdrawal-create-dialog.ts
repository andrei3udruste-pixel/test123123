import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { WalletApiService, WalletViewDTO } from '../../../../shared/services/wallet/wallet-api.service';
import { WalletDataService } from '../../../../shared/services/wallet/wallet';
import { WithdrawalApiService, WithdrawalCreateDTO } from '../../../../shared/services/withdrawal/withdrawal-api.service';
import { CurrencyService } from '../../../../openapi/api/currency.service';
import { CurrencyViewDTO } from '../../../../openapi/model/currencyViewDTO';

@Component({
  selector: 'app-withdrawal-create-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    TranslatePipe
  ],
  templateUrl: './withdrawal-create-dialog.html',
  styleUrl: './withdrawal-create-dialog.scss'
})
export class WithdrawalCreateDialog implements OnInit {
  private dialogRef = inject(MatDialogRef<WithdrawalCreateDialog>);
  private fb = inject(FormBuilder);
  private withdrawalApi = inject(WithdrawalApiService);
  private walletApi = inject(WalletApiService);
  private walletData = inject(WalletDataService);
  private currencyService = inject(CurrencyService);
  private snackBar = inject(MatSnackBar);
  private translateService = inject(TranslateService);

  form!: FormGroup;
  wallet?: WalletViewDTO;
  currencies: CurrencyViewDTO[] = [];
  selectedCurrency?: CurrencyViewDTO;
  convertedAmount?: number;
  isSubmitting = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      currencyCode: [null, [Validators.required]],
      payoutMethod: [null, [Validators.required]],
      payoutDetails: [null, [Validators.required]],
    });

    this.form.get('amount')?.valueChanges.subscribe(() => this.calculateConversion());
    this.form.get('currencyCode')?.valueChanges.subscribe((code) => {
      this.selectedCurrency = this.currencies.find(c => c.code === code);
      this.calculateConversion();
    });

    this.loadWallet();
    this.loadCurrencies();
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

  loadCurrencies(): void {
    this.currencyService.findAll().subscribe({
      next: (res) => {
        this.currencies = res.data ?? [];
      },
      error: (err) => {
        console.error('Failed to load currencies', err);
      },
    });
  }

  calculateConversion(): void {
    const amount = this.form.get('amount')?.value;
    const sellingConversion = this.selectedCurrency?.sellingConversion;
    if (amount && sellingConversion && sellingConversion > 0) {
      this.convertedAmount = amount / sellingConversion;
    } else {
      this.convertedAmount = undefined;
    }
  }

  isAmountValid(): boolean {
    const amount = this.form.get('amount')?.value;
    return this.wallet ? amount <= this.wallet.balance : false;
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onSubmit(): void {
    if (this.form.invalid || !this.isAmountValid()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const dto: WithdrawalCreateDTO = {
      amount: Number(this.form.value.amount),
      currencyCode: String(this.form.value.currencyCode),
      payoutMethod: String(this.form.value.payoutMethod),
      payoutDetails: String(this.form.value.payoutDetails),
    };

    this.withdrawalApi.create(dto).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.walletData.loadMyWallet();
        this.snackBar.open(
          this.translateService.instant('success.withdrawalSubmitted'),
          this.translateService.instant('actions.close'),
          { duration: 3000 }
        );
        this.dialogRef.close(true);
      },
      error: () => {
        this.isSubmitting = false;
        this.snackBar.open(
          this.translateService.instant('error.unknownError'),
          this.translateService.instant('actions.close'),
          { duration: 3000 }
        );
      },
    });
  }
}
