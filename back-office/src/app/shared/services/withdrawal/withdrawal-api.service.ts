import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBaseResponse } from '../../models/base-response';
import { IPageResponse } from '../../models/page-response';

export type WithdrawalStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'PAID';

export interface WithdrawalViewDTO {
  id: string;
  username: string;
  amount: number;
  payoutMethod: string;
  payoutDetails: string;
  status: WithdrawalStatus;
  createdAt: string;
  processedAt?: string | null;
  adminNote?: string | null;
}

export interface WithdrawalUpdateDTO {
  status: WithdrawalStatus;
  adminNote?: string | null;
}

@Injectable({ providedIn: 'root' })
export class WithdrawalApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/withdrawal';

  searchAdmin(params: { status?: WithdrawalStatus; username?: string; page?: number; size?: number; sort?: string; }): Observable<IPageResponse<WithdrawalViewDTO>> {
    let httpParams = new HttpParams();

    if (params.status) httpParams = httpParams.set('status', params.status);
    if (params.username) httpParams = httpParams.set('username', params.username);
    if (params.page != null) httpParams = httpParams.set('page', params.page);
    if (params.size != null) httpParams = httpParams.set('size', params.size);
    if (params.sort) httpParams = httpParams.set('sort', params.sort);

    return this.http.get<IPageResponse<WithdrawalViewDTO>>(`${this.baseUrl}/admin/search`, { params: httpParams });
  }

  getOneAdmin(id: string): Observable<IBaseResponse<WithdrawalViewDTO>> {
    return this.http.get<IBaseResponse<WithdrawalViewDTO>>(`${this.baseUrl}/admin/${id}`);
  }

  updateAdmin(id: string, dto: WithdrawalUpdateDTO): Observable<IBaseResponse<WithdrawalViewDTO>> {
    return this.http.put<IBaseResponse<WithdrawalViewDTO>>(`${this.baseUrl}/admin/${id}`, dto);
  }
}
