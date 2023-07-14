import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categories } from './models/Categories';
@Injectable({
  providedIn: 'root'
})
export class VisualChartsService {
  private baseUrl = 'https://localhost:7211/api/ExpenseManagement';
  categoriesData!: Categories[];
  
  constructor(private http:HttpClient) { }
  
  getAllCategories(userId:string):Observable<Categories[]>
  {
    const url = `${this.baseUrl}?userId=${userId}`;
    return this.http.get<Categories[]>(url);
  }
  
}
