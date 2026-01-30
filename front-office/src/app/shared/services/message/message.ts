import {inject, Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private snackBar = inject(MatSnackBar);
  private translateService = inject(TranslateService);

  private getConfig(type: ToastType): MatSnackBarConfig {
    const baseConfig: MatSnackBarConfig = {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    };

    switch (type) {
      case 'success':
        return { ...baseConfig, panelClass: ['snackbar-success'] };
      case 'error':
        return { ...baseConfig, panelClass: ['snackbar-error'] };
      case 'warning':
        return { ...baseConfig, panelClass: ['snackbar-warning'] };
      case 'info':
      default:
        return { ...baseConfig, panelClass: ['snackbar-info'] };
    }
  }

  openSnackBarMessage(message: string, type: ToastType = 'info'): void {
    this.snackBar.open(
      message,
      this.translateService.instant('actions.close'),
      this.getConfig(type)
    );
  }

  openSnackBarMessageKey(messageKey: string, type: ToastType = 'error'): void {
    const translated = this.translateService.instant(messageKey);
    if (translated === messageKey) {
      // Key not found, show a generic error
      this.snackBar.open(
        this.translateService.instant('error.unknownError'),
        this.translateService.instant('actions.close'),
        this.getConfig(type)
      );
      return;
    }

    this.snackBar.open(
      translated,
      this.translateService.instant('actions.close'),
      this.getConfig(type)
    );
  }

  success(messageKey: string): void {
    this.openSnackBarMessageKey(messageKey, 'success');
  }

  error(messageKey: string): void {
    this.openSnackBarMessageKey(messageKey, 'error');
  }

  warning(messageKey: string): void {
    this.openSnackBarMessageKey(messageKey, 'warning');
  }

  info(messageKey: string): void {
    this.openSnackBarMessageKey(messageKey, 'info');
  }
}
