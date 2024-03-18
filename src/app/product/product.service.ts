import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductView } from './products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private URL = 'http://localhost:8080/api/v1/products';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<ProductView[]> {
    return this.http.get<ProductView[]>(`${this.URL}/all`);
  }

  addProduct(formData: Product): Observable<Product> {

    return this.http.post<Product>(`${this.URL}/addProduct`, formData);
  }

  findProductById(productId: string): Observable<ProductView> {
    return this.http.get<ProductView>(`${this.URL}/details/${productId}`);
  }
}
