import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { AuthService } from 'src/app/user/auth.service';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, of, switchMap } from 'rxjs';
import { User } from 'src/app/user/Types';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  currentUser: string = '';
  cartCounter$: Observable<number> | undefined;

  constructor(public cartService: CartService, private authService: AuthService, private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (user) {
          return of<User>(user);
        }
        return EMPTY;
      })
    ).subscribe({
      next: (user) => {
        return this.currentUser = user?.username || '';
      },

      error: (err) => {
        this.toastrService.error("Failed! " + err.error.message,  "Error");
        return '';
      }
    });

    this.loadUserCartProducts();
    this.cartCounter$ = this.cartService.cartCounter$;
  }

  loadUserCartProducts() {
    this.cartService.getProductsByUser(this.currentUser).subscribe({
      next: (products) => {
        this.cartService.updateCartCounter(products.length);
      },

      error: (err) => {
        this.toastrService.error("Failed! " + err.error.message,  "Error");
      }
    });
  }
}
