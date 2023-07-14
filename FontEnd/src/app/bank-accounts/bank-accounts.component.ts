import { Component, OnInit } from '@angular/core';
import { BankAccountService } from '../services/bank-accounts.service';
import { BankAccount } from '../services/models/bank-account';
@Component({
  selector: 'app-bank-accounts',
  templateUrl: './bank-accounts.component.html',
  styleUrls: ['./bank-accounts.component.css']
})
export class BankAccountsComponent implements OnInit {
  bankAccounts: BankAccount[] = [];

  constructor(private bankAccountService: BankAccountService) { }

  ngOnInit(): void {
    this.getBankAccounts();
  }

  getBankAccounts(): void {
    this.bankAccountService.getBankAccounts()
      .subscribe(bankAccounts => this.bankAccounts = bankAccounts);
  }
}

