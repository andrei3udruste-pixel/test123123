import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslatePipe } from '@ngx-translate/core';

import { WithdrawalApiService, WithdrawalStatus, WithdrawalViewDTO } from '../../../shared/services/withdrawal/withdrawal-api.service';
import {DatePipe, DecimalPipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { WithdrawalRejectDialog } from '../reject-dialog/reject-dialog';
import { WithdrawalPaidDialog } from '../paid-dialog/paid-dialog';


@Component({
  selector: 'app-withdrawal-list-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    TranslatePipe,
    DatePipe,
    DecimalPipe,
    RouterLink
  ],
  templateUrl: './withdrawal-list-page.html',
  styleUrl: './withdrawal-list-page.scss'
})
export class WithdrawalListPage implements OnInit {
  private api = inject(WithdrawalApiService);
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);


  filterForm = this.fb.group({
    username: [''],
    status: ['' as any]
  });

  rows = signal<WithdrawalViewDTO[]>([]);
  totalItems = signal<number>(0);

  page = signal<number>(0);
  pageSize = signal<number>(10);
  pageSizeOptions = [5, 10, 25];

  displayedColumns: string[] = ['createdAt', 'username', 'amount', 'convertedAmount', 'status', 'actions'];

  statuses: { value: WithdrawalStatus; labelKey: string }[] = [
    { value: 'PENDING', labelKey: 'withdrawal.status.PENDING' },
    { value: 'APPROVED', labelKey: 'withdrawal.status.APPROVED' },
    { value: 'REJECTED', labelKey: 'withdrawal.status.REJECTED' },
    { value: 'PAID', labelKey: 'withdrawal.status.PAID' },
  ];

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    const username = (this.filterForm.value.username ?? '').trim();
    const status = (this.filterForm.value.status ?? '') as WithdrawalStatus | '';

    this.api.searchAdmin({
      username: username || undefined,
      status: status || undefined,
      page: this.page(),
      size: this.pageSize(),
      sort: 'createdAt,desc'
    }).subscribe((resp) => {
      this.rows.set(resp.data ?? []);
      this.totalItems.set(resp.totalElements ?? 0);
    });
  }

  applyFilters(): void {
    this.page.set(0);
    this.load();
  }

  onPageChange(ev: PageEvent): void {
    this.page.set(ev.pageIndex);
    this.pageSize.set(ev.pageSize);
    this.load();
  }

  approve(w: WithdrawalViewDTO): void {
    this.api.updateAdmin(w.id, { status: 'APPROVED' }).subscribe(() => this.load());
  }

  reject(w: WithdrawalViewDTO): void {
    const ref = this.dialog.open(WithdrawalRejectDialog, { width: '400px' });

    ref.afterClosed().subscribe((adminNote: string | null) => {
      if (!adminNote) return;

      this.api.updateAdmin(w.id, {
        status: 'REJECTED',
        adminNote
      }).subscribe(() => this.load());
    });
  }


  markPaid(w: WithdrawalViewDTO): void {
    const ref = this.dialog.open(WithdrawalPaidDialog, { width: '480px' });

    ref.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) return;

      this.api.updateAdmin(w.id, { status: 'PAID' })
        .subscribe(() => this.load());
    });
  }

}
