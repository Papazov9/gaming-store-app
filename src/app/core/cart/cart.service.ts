import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/product/products';
import { User } from 'src/app/user/Types';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private USER_URL: string = "http://localhost:8080/api/v1/user";
  private cartCount = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) { }

  getProductsByUser(currentUser: string):Observable<Product[]> {
    return this.http.get<Product[]>(`${this.USER_URL}/cartProducts/${currentUser}`);
  }

  addToCart(user: User, productId: string): Observable<Product> {
    let cartRequest = {
      username: user.username,
      productId: productId
    }
    return this.http.post<Product>(`${this.USER_URL}/addToCart`, cartRequest);
  }

  incrementCartCount(): void {
    this.cartCount.next(this.cartCount.value + 1);
  }

  public get cartCounter$(): Observable<number> {
    return this.cartCount.asObservable();
  }
  public updateCartCounter(amount: number) {
    this.cartCount.next(this.cartCount.value + amount);
  }
}
