import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { Product } from 'src/app/product/products';
import { User, UserDetailed } from 'src/app/user/Types';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy{
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

  getAllUserInfo(username: string | undefined): Observable<UserDetailed> {
    if (username) {   
      return this.http.get<UserDetailed>(`${this.USER_URL}/profile/${username}`);
    }
    return EMPTY;
  }

  incrementCartCount(): void {
    this.cartCount.next(this.cartCount.value + 1);
  }

  public get cartCounter$(): Observable<number> {
    return this.cartCount.asObservable();
  }
  public updateCartCounter(amount: number) {
    this.cartCount.next(amount);
  }

  ngOnDestroy(): void {
    this.cartCount.unsubscribe()
  }
}
