import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TranslatePipe } from '@ngx-translate/core';

import { CurrencyService } from '../../../openapi/api/currency.service';
import { CurrencyViewDTO } from '../../../openapi/model/currencyViewDTO';
import { CurrencyEditDialog } from '../currency-edit-dialog/currency-edit-dialog';

@Component({
  selector: 'app-currency-list-page',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule,
    TranslatePipe
  ],
  templateUrl: './currency-list-page.html',
  styleUrl: './currency-list-page.scss'
})
export class CurrencyListPage implements OnInit {
  private currencyService = inject(CurrencyService);
  private dialog = inject(MatDialog);

  displayedColumns = ['id', 'code', 'name', 'buyingConversion', 'sellingConversion', 'actions'];
  dataSource = signal(new MatTableDataSource<CurrencyViewDTO>([]));
  isLoading = signal(false);

  ngOnInit(): void {
    this.loadCurrencies();
  }

  loadCurrencies(): void {
    this.isLoading.set(true);
    this.currencyService.findAll().subscribe({
      next: (response) => {
        this.dataSource.set(new MatTableDataSource<CurrencyViewDTO>(response.data ?? []));
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  openEditDialog(currency: CurrencyViewDTO): void {
    const dialogRef = this.dialog.open(CurrencyEditDialog, {
      width: '400px',
      data: { currency }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCurrencies();
      }
    });
  }
}
