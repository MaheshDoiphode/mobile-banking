import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7270/api/User/RegisterUser';

  constructor(private http: HttpClient) {}

  signUp(formData: any): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}
