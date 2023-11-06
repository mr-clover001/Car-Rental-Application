import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalAgreementAcceptanceComponent } from './rental-agreement-acceptance.component';

describe('RentalAgreementAcceptanceComponent', () => {
  let component: RentalAgreementAcceptanceComponent;
  let fixture: ComponentFixture<RentalAgreementAcceptanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentalAgreementAcceptanceComponent]
    });
    fixture = TestBed.createComponent(RentalAgreementAcceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
