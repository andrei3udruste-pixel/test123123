import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { CurrencyService } from '../../../openapi/api/currency.service';
import { CurrencyViewDTO } from '../../../openapi/model/currencyViewDTO';

export interface CurrencyEditDialogData {
  currency: CurrencyViewDTO;
}

@Component({
  selector: 'app-currency-edit-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    TranslatePipe
  ],
  templateUrl: './currency-edit-dialog.html',
  styleUrl: './currency-edit-dialog.scss'
})
export class CurrencyEditDialog {
  private dialogRef = inject(MatDialogRef<CurrencyEditDialog>);
  private data = inject<CurrencyEditDialogData>(MAT_DIALOG_DATA);
  private currencyService = inject(CurrencyService);
  private snackBar = inject(MatSnackBar);
  private translateService = inject(TranslateService);

  currency = this.data.currency;
  isSubmitting = false;

  form = new FormGroup({
    buyingConversion: new FormControl<number>(this.currency.buyingConversion ?? 0, [
      Validators.required,
      Validators.min(0.000001)
    ]),
    sellingConversion: new FormControl<number>(this.currency.sellingConversion ?? 0, [
      Validators.required,
      Validators.min(0.000001)
    ])
  });

  onCancel(): void {
    this.dialogRef.close(false);
  }

  isValid(): boolean {
    if (this.form.invalid) return false;
    const buying = this.form.value.buyingConversion ?? 0;
    const selling = this.form.value.sellingConversion ?? 0;
    return buying > selling;
  }

  onSave(): void {
    if (!this.isValid()) {
      return;
    }

    this.isSubmitting = true;

    this.currencyService.update(this.currency.id!, {
      buyingConversion: this.form.value.buyingConversion!,
      sellingConversion: this.form.value.sellingConversion!
    }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.snackBar.open(
          this.translateService.instant('success.updated'),
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
      }
    });
  }
}
