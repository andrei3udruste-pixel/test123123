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

import { CurrencyService } from '../../../openapi/api/currency.service';
import { PaymentService } from '../../../openapi/api/payment.service';
import { CurrencyViewDTO } from '../../../openapi/model/currencyViewDTO';
import { BaseResponseListCurrencyViewDTO } from '../../../openapi/model/baseResponseListCurrencyViewDTO';
import { BaseResponseCheckoutSessionDTO } from '../../../openapi/model/baseResponseCheckoutSessionDTO';

@Component({
  selector: 'app-add-stakes-dialog',
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
  templateUrl: './add-stakes-dialog.html',
  styleUrl: './add-stakes-dialog.scss'
})
export class AddStakesDialog implements OnInit {
  private dialogRef = inject(MatDialogRef<AddStakesDialog>);
  private fb = inject(FormBuilder);
  private currencyService = inject(CurrencyService);
  private paymentService = inject(PaymentService);
  private snackBar = inject(MatSnackBar);
  private translateService = inject(TranslateService);

  form!: FormGroup;
  currencies: CurrencyViewDTO[] = [];
  selectedCurrency?: CurrencyViewDTO;
  stakesAmount?: number;
  isSubmitting = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      currencyCode: [null, [Validators.required]]
    });

    this.form.get('amount')?.valueChanges.subscribe(() => this.calculateStakes());
    this.form.get('currencyCode')?.valueChanges.subscribe((code) => {
      this.selectedCurrency = this.currencies.find(c => c.code === code);
      this.calculateStakes();
    });

    this.loadCurrencies();
  }

  loadCurrencies(): void {
    this.currencyService.findAll().subscribe({
      next: (res: BaseResponseListCurrencyViewDTO) => {
        this.currencies = res.data ?? [];
        if (this.currencies.length > 0) {
          this.form.patchValue({ currencyCode: this.currencies[0].code });
        }
      },
      error: (err: Error) => {
        console.error('Failed to load currencies', err);
      }
    });
  }

  calculateStakes(): void {
    const amount = this.form.get('amount')?.value;
    if (amount && this.selectedCurrency?.buyingConversion) {
      this.stakesAmount = amount * this.selectedCurrency.buyingConversion;
    } else {
      this.stakesAmount = undefined;
    }
  }

  onSubmit(): void {
    if (this.form.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    const { amount, currencyCode } = this.form.value;

    this.paymentService.createCheckout({ amount, currencyCode }).subscribe({
      next: (res: BaseResponseCheckoutSessionDTO) => {
        this.isSubmitting = false;
        if (res.data?.checkoutUrl) {
          // Redirect to Stripe Checkout
          window.location.href = res.data.checkoutUrl;
        }
      },
      error: (err: Error) => {
        this.isSubmitting = false;
        const msg = this.translateService.instant('error.unknownError');
        this.snackBar.open(msg, undefined, { duration: 3000 });
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
