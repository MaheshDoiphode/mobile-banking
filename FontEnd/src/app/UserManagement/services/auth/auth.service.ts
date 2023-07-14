import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:7270/api/User/";

  constructor(private http: HttpClient) { }


  signUp(userObj: any){
    return this.http.post<any>(`${this.baseUrl}RegisterUser`, userObj);
  }

  login(userObj: any){
    return this.http.post<any>(`${this.baseUrl}authenticate`, userObj);
  }
  generateOTP(email: string){
    // Implement the logic to generate OTP and send it to the user's email
    // You can use the HttpClient to make an HTTP request to the appropriate API endpoint
    // Example:
    return this.http.get<any>(`${this.baseUrl}otp/set?id=1`);
  }

  verifyOTP(otp: string){
    // Implement the logic to verify the OTP entered by the user
    // You can use the HttpClient to make an HTTP request to the appropriate API endpoint
    // Example:
    return this.http.get<any>(`${this.baseUrl}otp/verify?id=1&otp=${otp}`);
  }
}
