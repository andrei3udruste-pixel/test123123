import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';


import { WithdrawalApiService, WithdrawalViewDTO } from '../../../shared/services/withdrawal/withdrawal-api.service';
import {DatePipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-withdrawal-details-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, TranslatePipe, DecimalPipe, DatePipe],
  templateUrl: './withdrawal-details-page.html',
  styleUrl: './withdrawal-details-page.scss'
})
export class WithdrawalDetailsPage implements OnInit {
  private api = inject(WithdrawalApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  w() {
    return this.withdrawal()!;
  }

  withdrawal = signal<WithdrawalViewDTO | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.api.getOneAdmin(id).subscribe(resp => {
      this.withdrawal.set(resp.data ?? null);
    });
  }

  back(): void {
    this.router.navigate(['/withdrawal']);
  }
}
