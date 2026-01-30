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
import { DatePipe, DecimalPipe } from '@angular/common';

import { PaymentService } from '../../../openapi/api/payment.service';
import { PageResponsePaymentViewDTO } from '../../../openapi/model/pageResponsePaymentViewDTO';
import { PaymentViewDTO } from '../../../openapi/model/paymentViewDTO';

@Component({
  selector: 'app-payment-list-page',
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
    DecimalPipe
  ],
  templateUrl: './payment-list-page.html',
  styleUrl: './payment-list-page.scss'
})
export class PaymentListPage implements OnInit {
  private api = inject(PaymentService);
  private fb = inject(FormBuilder);

  filterForm = this.fb.group({
    username: [''],
    status: ['' as any]
  });

  rows = signal<PaymentViewDTO[]>([]);
  totalItems = signal<number>(0);

  page = signal<number>(0);
  pageSize = signal<number>(10);
  pageSizeOptions = [5, 10, 25];

  displayedColumns: string[] = ['createdAt', 'username', 'amount', 'convertedAmount', 'status'];

  statuses: { value: string; labelKey: string }[] = [
    { value: 'PENDING', labelKey: 'payment.status.PENDING' },
    { value: 'COMPLETED', labelKey: 'payment.status.COMPLETED' },
    { value: 'FAILED', labelKey: 'payment.status.FAILED' },
    { value: 'CANCELLED', labelKey: 'payment.status.CANCELLED' },
  ];

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.api.searchAdmin2(
      this.page(),
      this.pageSize(),
      ['createdAt,desc']
    ).subscribe((resp: PageResponsePaymentViewDTO) => {
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
}
