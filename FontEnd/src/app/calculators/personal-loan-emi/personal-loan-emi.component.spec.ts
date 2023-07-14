import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalLoanEmiComponent } from './personal-loan-emi.component';

describe('PersonalLoanEmiComponent', () => {
  let component: PersonalLoanEmiComponent;
  let fixture: ComponentFixture<PersonalLoanEmiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalLoanEmiComponent]
    });
    fixture = TestBed.createComponent(PersonalLoanEmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
