import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BASE_PATH } from '../../../openapi';
import { IBaseResponse } from '../../models/base-response';

export interface WalletViewDTO {
  balance: number;
  currency: string;
}

@Injectable({ providedIn: 'root' })
export class WalletApiService {
  constructor(
    private http: HttpClient,
    @Optional() @Inject(BASE_PATH) private basePath: string | string[] | null
  ) {}

  private get baseUrl(): string {
    const bp = Array.isArray(this.basePath) ? this.basePath[0] : this.basePath;
    return `${bp ?? 'http://localhost:8080'}/api/wallet`;
  }

  getMy(): Observable<IBaseResponse<WalletViewDTO>> {
    return this.http.get<IBaseResponse<WalletViewDTO>>(`${this.baseUrl}/my`);
  }
}
