import { TestBed } from '@angular/core/testing';

import { LayoutStateService } from './layout-state';

describe('LayoutState', () => {
  let service: LayoutStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
