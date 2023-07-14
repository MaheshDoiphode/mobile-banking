import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { BankAccount } from './models/bank-account';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class BankAccountService {
  private apiUrl = 'https://localhost:7211/UserManagement/GetAccountDetails';

  constructor(private http: HttpClient, private userService: UserService) { }

  getBankAccounts(): Observable<BankAccount[]> {
    return this.userService.user.pipe(
      switchMap(user => {
        if (user) {
          return this.http.get<BankAccount[]>(`${this.apiUrl}/${user.userID}`);
        } else {
          return of([]);
        }
      })
    );
  }
}