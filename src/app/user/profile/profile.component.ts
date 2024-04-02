import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { UserDTO, UserDetailed } from '../Types';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/cart/cart.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy{

  isLoading$$ = new BehaviorSubject<boolean>(false);
  userProfile$$ = new BehaviorSubject<UserDetailed | null>(null);
  username: string | undefined;
  curUserSub$?: Subscription;


  constructor(private authService: AuthService,private cartService: CartService, private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.curUserSub$ = this.authService.currentUser$.subscribe(u => this.username = u?.username);
    this.isLoading$$.next(true);
    this.cartService.getAllUserInfo(this.username).pipe(
      tap(() => this.isLoading$$.next(false))
    ).subscribe(user => {
      this.userProfile$$.next(user);
      console.log(this.userProfile$$.value);
    },
    error => {
      this.toastrService.error("Cannot load user profile!", "Error");
    });
  }

  ngOnDestroy(): void {
    if (this.curUserSub$) {
      this.curUserSub$.unsubscribe();
    }
  }
}
