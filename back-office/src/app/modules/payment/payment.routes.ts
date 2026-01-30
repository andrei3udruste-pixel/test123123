import { Routes } from '@angular/router';

const paymentRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./payment-list-page/payment-list-page').then(m => m.PaymentListPage)
  }
];

export default paymentRoutes;
