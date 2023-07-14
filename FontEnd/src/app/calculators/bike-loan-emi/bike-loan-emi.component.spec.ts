import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeLoanEmiComponent } from './bike-loan-emi.component';

describe('BikeLoanEmiComponent', () => {
  let component: BikeLoanEmiComponent;
  let fixture: ComponentFixture<BikeLoanEmiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BikeLoanEmiComponent]
    });
    fixture = TestBed.createComponent(BikeLoanEmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
