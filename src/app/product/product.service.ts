import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private URL = 'http://localhost:8080/api/v1/products';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}` 
    });
    return this.http.get<Product[]>(`${this.URL}/all`, {headers});
  }

  addProduct(formData: Product): Observable<Product> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}` 
    });
    return this.http.post<Product>(`${this.URL}/addProduct`, formData, {headers});
  }
}
