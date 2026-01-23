import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalListPage } from './withdrawal-list-page';

describe('WithdrawalListPage', () => {
  let component: WithdrawalListPage;
  let fixture: ComponentFixture<WithdrawalListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithdrawalListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawalListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
