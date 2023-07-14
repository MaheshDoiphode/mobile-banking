import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private apiUrl = 'https://localhost:7211/api/transaction/create'; // Your API URL

  constructor(private http: HttpClient) { }

  createTransaction(requestBody: any): Observable<string> {
    return this.http.post('https://localhost:7211/api/transaction/create', requestBody, { responseType: 'text' });
  }
}