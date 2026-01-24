import { Injectable, inject, signal } from '@angular/core';
import { WalletApiService, WalletViewDTO } from './wallet-api.service';


@Injectable({
  providedIn: 'root',
})
export class WalletDataService {
  private walletApi = inject(WalletApiService);

  _wallet = signal<WalletViewDTO | null>(null);

  get signal() {
    return this._wallet;
  }

  get data(): WalletViewDTO | null {
    return this._wallet();
  }

  loadMyWallet(): void {
    this.walletApi.getMy().subscribe({
      next: (res) => {
        this._wallet.set(res.data ?? null);
      },
      error: () => {
        this._wallet.set(null);
      },
    });
  }

  clear(): void {
    this._wallet.set(null);
  }
}
