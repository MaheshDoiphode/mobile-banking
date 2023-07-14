import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserDetails } from './models/UserDetails';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<UserDetails>;
  user: BehaviorSubject<UserDetails | null> = new BehaviorSubject<UserDetails | null>(null);

  constructor(private http: HttpClient, private router : Router) {
    this.userSubject = new BehaviorSubject<UserDetails>(JSON.parse(localStorage.getItem('user') || '{}'));
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user.next(JSON.parse(userData));
    }
  }

  public get userValue(): UserDetails {
    return this.userSubject.value;
  }

  getOTP(email: string, password: string): Observable<UserDetails> {
    const body = {
      email,
      password,
      registrationIP: '128.23.21.1', // This should be dynamically generated
    };
    return this.http.post<UserDetails>(
      'https://localhost:7211/UserManagement/LoginUser',
      body
    ).pipe(
      tap(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.user.next(user);
      })
    );
  }

  verifyOTP(jwt: string, otp: string): Observable<any> {
    const params = new HttpParams().set('JWT', jwt).set('otp', otp);
    return this.http.post('https://localhost:7211/UserManagement/VerifyOTP', { params }, { responseType: 'text' });
  }

  
}


