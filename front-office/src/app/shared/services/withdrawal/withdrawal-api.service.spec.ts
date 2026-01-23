import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WithdrawalApiService } from './withdrawal-api.service';

describe('WithdrawalApiService', () => {
  let service: WithdrawalApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(WithdrawalApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
