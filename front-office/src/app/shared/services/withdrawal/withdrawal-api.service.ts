import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BASE_PATH } from '../../../openapi';
import { IBaseResponse } from '../../models/base-response';
import { IPageResponse } from '../../models/page-response';


export interface WithdrawalCreateDTO {
  amount: number;
  currencyCode: string;
  payoutMethod: string;
  payoutDetails: string;
}


export interface WithdrawalViewDTO {
  id: string;
  amount: number;
  currencyCode?: string;
  convertedAmount?: number;
  payoutMethod: string;
  payoutDetails: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  processedAt?: string | null;
  adminNote?: string | null;
}



@Injectable({
  providedIn: 'root',
})
export class WithdrawalApiService {
  private readonly http: HttpClient;

  constructor(
    http: HttpClient,
    @Optional() @Inject(BASE_PATH) private basePath: string | string[] | null
  ) {
    this.http = http;
  }

  private get baseUrl(): string {
    const bp = Array.isArray(this.basePath)
      ? this.basePath[0]
      : this.basePath;

    return `${bp ?? 'http://localhost:8080'}/api/withdrawal`;
  }

  create(
    dto: WithdrawalCreateDTO
  ): Observable<IBaseResponse<WithdrawalViewDTO>> {
    return this.http.post<IBaseResponse<WithdrawalViewDTO>>(
      this.baseUrl,
      dto
    );
  }

  getMy(
    page: number,
    size: number,
    sort?: string,
    direction?: string
  ): Observable<IPageResponse<WithdrawalViewDTO>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (sort && direction) {
      params = params.set('sort', `${sort},${direction}`);
    }

    return this.http.get<IPageResponse<WithdrawalViewDTO>>(
      `${this.baseUrl}/my`,
      { params }
    );
  }
}
