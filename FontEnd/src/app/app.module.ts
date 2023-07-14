import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BikeLoanEmiComponent } from './calculators/bike-loan-emi/bike-loan-emi.component';
import { FixedDepositCalculatorComponent } from './calculators/fixed-deposit-calculator/fixed-deposit-calculator.component';
import { PersonalLoanEmiComponent } from './calculators/personal-loan-emi/personal-loan-emi.component';
import { FinanceToolsComponent } from './finance-tools/finance-tools.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { ContentComponent } from './authentication/content/content.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { NgToastModule } from 'ng-angular-popup';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './authentication/login/login.component';
import { TransferComponent } from './transfer/transfer.component';
import { TransactionsComponent } from './transaction-history/transactions/transactions.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DashboardLeftPanelComponent } from './dashboard/dashboard-left-panel/dashboard-left-panel.component';
import { DashboardMainContentComponent } from './dashboard/dashboard-main-content/dashboard-main-content.component';
import { GraphsComponent } from './visuals/graphs/graphs.component';
import { ChartsComponent } from './visuals/charts/charts.component';
import { BankAccountsComponent } from './bank-accounts/bank-accounts.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { FloatingIconComponent } from './chatbot/floating-icon/floating-icon.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AuthGuardService } from './services/auth-guard.service';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ContentComponent,
    DashboardComponent,
    AuthenticationComponent,
    NavigationComponent,
    HomeComponent,
    
    AccountDetailsComponent,
    TransactionHistoryComponent,
    FooterComponent,
    DashboardLeftPanelComponent,
    DashboardMainContentComponent,
    BikeLoanEmiComponent,
    FixedDepositCalculatorComponent,
    PersonalLoanEmiComponent,
    FinanceToolsComponent,
    TransactionsComponent,
    GraphsComponent,
    ChartsComponent,
    BankAccountsComponent,
    ChatbotComponent,
    FloatingIconComponent,
    TransferComponent
    
    
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatSidenavModule,
    HttpClientModule,
    MatDialogModule,
    NgToastModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    DragDropModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
