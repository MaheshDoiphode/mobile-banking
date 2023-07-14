import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './authentication/signup/signup.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ContentComponent } from './authentication/content/content.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { FinanceToolsComponent } from './finance-tools/finance-tools.component';
import { BikeLoanEmiComponent } from './calculators/bike-loan-emi/bike-loan-emi.component';
import { FixedDepositCalculatorComponent } from './calculators/fixed-deposit-calculator/fixed-deposit-calculator.component';
import { PersonalLoanEmiComponent } from './calculators/personal-loan-emi/personal-loan-emi.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './authentication/login/login.component';
import { TransferComponent } from './transfer/transfer.component';
import { TransactionsComponent } from './transaction-history/transactions/transactions.component';
import { DashboardMainContentComponent } from './dashboard/dashboard-main-content/dashboard-main-content.component';
import { DashboardLeftPanelComponent } from './dashboard/dashboard-left-panel/dashboard-left-panel.component';
import { BankAccountsComponent } from './bank-accounts/bank-accounts.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { AuthGuardService } from './services/auth-guard.service';
const routes: Routes = [
  {
    path: 'authentication', component: AuthenticationComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'content', component: ContentComponent },
      { path: '', component: LoginComponent},
    ]
  },
  { path: 'footer', component: FooterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: 'dashboard', component: DashboardComponent,
  children: [
    {path: 'bank-accounts', component: BankAccountsComponent},
    {path: 'transactions', component: TransactionsComponent},
    { path: 'dashboard-main-content', component: DashboardMainContentComponent },
    { path: 'transaction-history', component: TransactionHistoryComponent},
    { path: 'transfer', component:  TransferComponent},
    { path: 'account-details', component: AccountDetailsComponent },
    { path: 'dashboard-left-panel', component: DashboardLeftPanelComponent },
    { path: 'finance-tools', component: FinanceToolsComponent, children : [
      { path: 'bike-loan-emi', component: BikeLoanEmiComponent },
      { path: 'fixed-deposit-calculator', component: FixedDepositCalculatorComponent },
      { path: 'personal-loan-emi', component: PersonalLoanEmiComponent },
      
    ]},
    { path: '', redirectTo: 'dashboard-main-content', pathMatch: 'full' }
  ]},
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'chat', component: ChatbotComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
