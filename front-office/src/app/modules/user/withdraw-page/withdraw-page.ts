import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WalletApiService, WalletViewDTO } from '../../../shared/services/wallet/wallet-api.service';
import { WalletDataService } from '../../../shared/services/wallet/wallet';



import {
  WithdrawalApiService,
  WithdrawalViewDTO,
  WithdrawalCreateDTO
} from '../../../shared/services/withdrawal/withdrawal-api.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-withdraw-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DatePipe,
    TranslatePipe
  ],
  templateUrl: './withdraw-page.html',
  styleUrl: './withdraw-page.scss',
})
export class WithdrawPage implements OnInit {
  form!: FormGroup;
  wallet?: WalletViewDTO;

  withdrawals: WithdrawalViewDTO[] = [];

  page = 0;
  size = 10;

  constructor(
    private fb: FormBuilder,
    private withdrawalApi: WithdrawalApiService,
    private walletApi: WalletApiService,
    private walletData: WalletDataService

) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      payoutMethod: [null, [Validators.required]],
      payoutDetails: [null, [Validators.required]],
    });


    this.loadWallet();
    this.loadMyWithdrawals();
  }

  loadWallet(): void {
    this.walletApi.getMy().subscribe({
      next: (res) => {
        this.wallet = res.data;
      },
      error: (err: any) => {
        console.error('Failed to load wallet', err);
      },
    });
  }


  loadMyWithdrawals(): void {
    this.withdrawalApi.getMy(this.page, this.size).subscribe({
      next: (res: any) => {
        const content = res?.data?.content ?? res?.content ?? res?.data ?? [];
        this.withdrawals = content;
      },
      error: (err) => {
        console.error('Failed to load withdrawals', err);
      },
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dto: WithdrawalCreateDTO = {
      amount: Number(this.form.value.amount),
      payoutMethod: String(this.form.value.payoutMethod),
      payoutDetails: String(this.form.value.payoutDetails),
    };


    this.withdrawalApi.create(dto).subscribe({
      next: () => {
        this.form.reset();
        this.loadMyWithdrawals();
        this.walletData.loadMyWallet();

      },
      error: (err) => {
        console.error('Failed to create withdrawal', err);
      },
    });
  }
}
