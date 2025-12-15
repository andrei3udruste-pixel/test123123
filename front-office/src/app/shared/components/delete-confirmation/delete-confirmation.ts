import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';

export interface DeleteConfirmationData {
  messageKey?: string;
  messageParams?: object;
}

@Component({
  selector: 'app-delete-confirmation',
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatButton,
    MatDialogActions,
    TranslatePipe
  ],
  templateUrl: './delete-confirmation.html',
  styleUrl: './delete-confirmation.scss',
})
export class DeleteConfirmation {
  readonly dialogReference = inject(MatDialogRef<DeleteConfirmation>);
  readonly data = inject<DeleteConfirmationData>(MAT_DIALOG_DATA);

  close(confirmation: boolean): void {
    this.dialogReference.close(confirmation);
  }
}
