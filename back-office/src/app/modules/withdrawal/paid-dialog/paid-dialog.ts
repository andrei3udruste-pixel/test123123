import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-withdrawal-paid-dialog',
  imports: [
    MatButtonModule,
    TranslatePipe
  ],
  template: `
    <h2 mat-dialog-title class="text-xl">{{ 'withdrawal.admin.paid' | translate }}</h2>

    <div class="dialog-content">
      <p class="text-base">{{ 'withdrawal.admin.paidConfirm' | translate }}</p>
    </div>

    <div class="dialog-actions">
      <button mat-stroked-button type="button" (click)="cancel()">
        {{ 'actions.cancel' | translate }}
      </button>
      <button mat-flat-button color="primary" type="button" (click)="confirm()">
        {{ 'actions.confirm' | translate }}
      </button>
    </div>
  `,
  styles: [`
    :host { display: block; padding: 24px; }
    .dialog-content { margin: 24px 0; }
    .dialog-actions { display: flex; justify-content: flex-end; gap: 12px; padding-top: 16px; }
  `]
})
export class WithdrawalPaidDialog {
  private dialogRef = inject(MatDialogRef<WithdrawalPaidDialog>);

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
