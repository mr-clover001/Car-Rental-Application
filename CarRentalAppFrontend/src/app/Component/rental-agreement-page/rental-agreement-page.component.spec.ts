import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalAgreementPageComponent } from './rental-agreement-page.component';

describe('RentalAgreementPageComponent', () => {
  let component: RentalAgreementPageComponent;
  let fixture: ComponentFixture<RentalAgreementPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentalAgreementPageComponent]
    });
    fixture = TestBed.createComponent(RentalAgreementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
