import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCarDetailComponent } from './update-car-detail.component';

describe('UpdateCarDetailComponent', () => {
  let component: UpdateCarDetailComponent;
  let fixture: ComponentFixture<UpdateCarDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCarDetailComponent]
    });
    fixture = TestBed.createComponent(UpdateCarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
