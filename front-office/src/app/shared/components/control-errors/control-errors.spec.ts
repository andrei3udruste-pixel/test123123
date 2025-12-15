import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlErrors } from './control-errors';

describe('ControlErrors', () => {
  let component: ControlErrors;
  let fixture: ComponentFixture<ControlErrors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlErrors]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlErrors);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
