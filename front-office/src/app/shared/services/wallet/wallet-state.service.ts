import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalletStateService {
  private _refreshWallet = signal(0);

  refreshWallet() {
    this._refreshWallet.update(v => v + 1);
  }

  get refreshWalletSignal() {
    return this._refreshWallet;
  }
}