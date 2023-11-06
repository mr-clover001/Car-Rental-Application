import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRentPageComponent } from './car-rent-page.component';

describe('CarRentPageComponent', () => {
  let component: CarRentPageComponent;
  let fixture: ComponentFixture<CarRentPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarRentPageComponent]
    });
    fixture = TestBed.createComponent(CarRentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
