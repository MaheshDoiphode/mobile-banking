import { Component } from '@angular/core';
import { PersonalLoanEmiComponent } from '../calculators/personal-loan-emi/personal-loan-emi.component';
import { BikeLoanEmiComponent } from '../calculators/bike-loan-emi/bike-loan-emi.component';
import { FixedDepositCalculatorComponent } from '../calculators/fixed-deposit-calculator/fixed-deposit-calculator.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-finance-tools',
  templateUrl: './finance-tools.component.html',
  styleUrls: ['./finance-tools.component.css']
})
export class FinanceToolsComponent {
  selectedCalculator: any;
  showPersonalLoanCalculator() {
    this.selectedCalculator = PersonalLoanEmiComponent;
  }

  showBikeLoanCalculator() {
    this.selectedCalculator = BikeLoanEmiComponent;
  }

  showFixedDepositCalculator() {
    this.selectedCalculator = FixedDepositCalculatorComponent;
  }

}