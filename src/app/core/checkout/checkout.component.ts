import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { AuthService } from 'src/app/user/auth.service';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/user/Types';
import { Product } from 'src/app/product/products';
import { ToastrService } from 'ngx-toastr';
import { OrderInfo } from './types';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy{

  currentUser?: string;
  currentUserSub?: Subscription;
  cartProducts$?: Observable<Product[]>;
  order?: OrderInfo;


  constructor(private cartService: CartService, private authService: AuthService, private toastrService: ToastrService) {}


  ngOnInit(): void {
    this.currentUserSub = this.authService.currentUser$.subscribe(user => this.currentUser = user?.username)
    if (this.currentUser) {
      this.cartProducts$ = this.cartService.getProductsByUser(this.currentUser);
    }

    this.cartProducts$?.subscribe(products => {
      this.fullFillOrderInfo(products);
    })
  }

  private fullFillOrderInfo(products: Product[]) {
    let totalDiscount: number = 0;
    let totalPrice: number = 0;
    let totalShipping = products.length * 5;
    let VAT = 20;

    products.forEach(p => {
      if (p.isOnSale) {
        totalDiscount += p.price * 0.2;
        totalPrice += p.price * 0.8; 
      } else {
        totalPrice += p.price;
      }
    });

    this.order = {
      discount: totalDiscount,
      total: totalPrice + totalShipping,
      shipping: totalShipping,
      VAT: VAT,
      productsCount: products.length
    }
  }

  checkout(): void {
    this.toastrService.warning("This is functionality is not ready yet!", "Warning");
  }

  ngOnDestroy(): void {
    if (this.currentUserSub) {
      this.currentUserSub.unsubscribe();
    }
  }

}
