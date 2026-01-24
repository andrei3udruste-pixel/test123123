import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-withdrawal-reject-dialog',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslatePipe
  ],
  template: `
    <h2 mat-dialog-title>{{ 'withdrawal.admin.reject' | translate }}</h2>

    <form [formGroup]="form" class="dialog-form">
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>{{ 'withdrawal.admin.adminNote' | translate }}</mat-label>
        <textarea matInput rows="4" formControlName="adminNote"></textarea>
      </mat-form-field>

      <div class="dialog-actions">
        <button mat-button type="button" (click)="cancel()">
          {{ 'common.cancel' | translate }}
        </button>
        <button mat-flat-button color="warn" type="button" (click)="confirm()" [disabled]="form.invalid">
          {{ 'withdrawal.admin.reject' | translate }}
        </button>
      </div>
    </form>
  `,
  styles: [`
    .dialog-form { margin-top: 8px; }
    .dialog-actions { display: flex; justify-content: flex-end; gap: 8px; }
    .w-full { width: 100%; }
  `]
})
export class WithdrawalRejectDialog {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<WithdrawalRejectDialog>);

  form = this.fb.group({
    adminNote: ['', Validators.required]
  });

  cancel(): void {
    this.dialogRef.close(null);
  }

  confirm(): void {
    this.dialogRef.close(this.form.value.adminNote);
  }
}
