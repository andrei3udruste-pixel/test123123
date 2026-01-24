import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalDetailsPage } from './withdrawal-details-page';

describe('WithdrawalDetailsPage', () => {
  let component: WithdrawalDetailsPage;
  let fixture: ComponentFixture<WithdrawalDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithdrawalDetailsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawalDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
