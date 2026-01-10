import { TestBed } from '@angular/core/testing';

import { UserRoutingResolve } from './user-routing-resolve';

describe('UserRoutingResolve', () => {
  let service: UserRoutingResolve;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRoutingResolve);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
