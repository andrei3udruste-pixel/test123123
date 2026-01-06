import {inject, Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private snackBar = inject(MatSnackBar);
  private translateService = inject(TranslateService);

  private readonly snackbarConfig: MatSnackBarConfig = {
    duration: 5000
  };

  openSnackBarMessage(message: string): void {
    this.snackBar.open(
      message,
      this.translateService.instant('actions.close'),
      this.snackbarConfig
    );
  }

  openSnackBarMessageKey(messageKey: string): void {
    if (this.translateService.instant(messageKey) === messageKey) {
      return;
    }

    this.snackBar.open(
      this.translateService.instant(messageKey),
      this.translateService.instant('actions.close'),
      this.snackbarConfig
    );
  }
}
