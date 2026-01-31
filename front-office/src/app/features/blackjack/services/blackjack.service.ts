import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BlackjackService {
  private apiUrl = 'http://localhost:8080/api/blackjack/deal';

  constructor(private http: HttpClient) {}

  deal(bet: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, { bet });
  }
}